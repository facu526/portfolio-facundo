import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_RATE_LIMIT_ENTRIES = 1_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROJECT_TYPES = new Set([
  "Web Institucional",
  "Landing Page",
  "Tienda Online",
  "Sistema Web",
  "Otro",
]);

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  website: string;
};

type RateLimitStore = Map<string, number>;

const globalForRateLimit = globalThis as typeof globalThis & {
  contactRateLimit?: RateLimitStore;
};

const rateLimitStore =
  globalForRateLimit.contactRateLimit ?? new Map<string, number>();

globalForRateLimit.contactRateLimit = rateLimitStore;

function jsonResponse(
  body: { ok: boolean; message: string },
  status: number,
  headers?: HeadersInit,
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function pruneRateLimitStore(now: number) {
  if (rateLimitStore.size < MAX_RATE_LIMIT_ENTRIES) return;

  for (const [key, timestamp] of rateLimitStore) {
    if (now - timestamp >= RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function hasLineBreak(value: string) {
  return /[\r\n]/.test(value);
}

function validatePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const record = value as Record<string, unknown>;
  const payload = {
    name: readString(record.name),
    email: readString(record.email),
    phone: readString(record.phone),
    projectType: readString(record.projectType),
    message: readString(record.message),
    website: readString(record.website),
  };

  if (
    !payload.name ||
    payload.name.length > 100 ||
    hasLineBreak(payload.name) ||
    !payload.email ||
    payload.email.length > 254 ||
    !EMAIL_PATTERN.test(payload.email) ||
    hasLineBreak(payload.email) ||
    !payload.phone ||
    payload.phone.length > 50 ||
    hasLineBreak(payload.phone) ||
    !PROJECT_TYPES.has(payload.projectType) ||
    !payload.message ||
    payload.message.length > 3_000 ||
    payload.website.length > 200
  ) {
    return null;
  }

  return payload;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function createEmailContent(payload: ContactPayload) {
  const safe = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone),
    projectType: escapeHtml(payload.projectType),
    message: escapeHtml(payload.message).replace(/\r?\n/g, "<br />"),
  };

  return {
    subject: `Consulta por ${payload.projectType} — ${payload.name}`,
    text: `Nueva consulta desde el portfolio

Nombre: ${payload.name}
Email: ${payload.email}
Teléfono o WhatsApp: ${payload.phone}
Tipo de proyecto: ${payload.projectType}

Mensaje:
${payload.message}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
  <h1 style="font-size:22px;margin:0 0 24px">Nueva consulta desde el portfolio</h1>
  <p><strong>Nombre:</strong> ${safe.name}</p>
  <p><strong>Email:</strong> ${safe.email}</p>
  <p><strong>Teléfono o WhatsApp:</strong> ${safe.phone}</p>
  <p><strong>Tipo de proyecto:</strong> ${safe.projectType}</p>
  <p style="margin-top:24px"><strong>Mensaje:</strong><br />${safe.message}</p>
</div>`,
  };
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse(
      { ok: false, message: "El contenido de la solicitud no es válido." },
      415,
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, message: "Solicitud demasiado grande." }, 413);
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ ok: false, message: "Solicitud inválida." }, 400);
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, message: "Solicitud demasiado grande." }, 413);
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ ok: false, message: "Solicitud inválida." }, 400);
  }

  const payload = validatePayload(body);

  if (!payload) {
    return jsonResponse(
      { ok: false, message: "Revisá los datos ingresados." },
      400,
    );
  }

  if (payload.website) {
    return jsonResponse(
      { ok: true, message: "Consulta enviada correctamente." },
      200,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !contactEmail || !fromEmail) {
    return jsonResponse(
      { ok: false, message: "El servicio de email no está configurado." },
      500,
    );
  }

  const now = Date.now();
  const clientIp = getClientIp(request);
  const previousRequest = rateLimitStore.get(clientIp);

  if (previousRequest && now - previousRequest < RATE_LIMIT_WINDOW_MS) {
    const retryAfter = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - previousRequest)) / 1_000,
    );

    return jsonResponse(
      {
        ok: false,
        message: "Esperá un momento antes de volver a enviar una consulta.",
      },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  pruneRateLimitStore(now);
  rateLimitStore.set(clientIp, now);

  const email = createEmailContent(payload);
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: payload.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error) {
      rateLimitStore.delete(clientIp);
      return jsonResponse(
        { ok: false, message: "No se pudo enviar la consulta." },
        502,
      );
    }

    return jsonResponse(
      { ok: true, message: "Consulta enviada correctamente." },
      200,
    );
  } catch {
    rateLimitStore.delete(clientIp);
    return jsonResponse(
      { ok: false, message: "No se pudo enviar la consulta." },
      502,
    );
  }
}
