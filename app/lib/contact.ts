export const CONTACT_DETAILS = {
  whatsapp: {
    display: "+54 11 26684038",
    number: "541126684038",
  },
  email: "facundosanchez0318@gmail.com",
  github: {
    display: "github.com/facu526",
    url: "https://github.com/facu526",
  },
  linkedin: {
    display: "linkedin.com/in/facundo-sanchez-03a219360",
    url: "https://linkedin.com/in/facundo-sanchez-03a219360",
  },
} as const;

export const WHATSAPP_MESSAGES = {
  contactCard: "Hola Facundo, estuve viendo tu portfolio.",
  floatingButton:
    "Hola Facundo, estuve viendo tu portfolio y quería hacerte una consulta.",
} as const;

export type ProjectInquiry = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${CONTACT_DETAILS.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function createProjectInquiryMessage({
  name,
  email,
  phone,
  projectType,
  message,
}: ProjectInquiry) {
  return `Hola Facundo, soy ${name}.

Email: ${email}
Teléfono: ${phone}
Tipo de proyecto: ${projectType}

Mensaje: ${message}`;
}
