"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  CONTACT_DETAILS,
  createProjectInquiryMessage,
  createWhatsAppUrl,
} from "../lib/contact";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./icons";

type Language = "es" | "en";

type ContactSectionProps = {
  language: Language;
  isDark: boolean;
  projectType: string;
  message: string;
  onProjectTypeChange: (projectType: string) => void;
  onMessageChange: (message: string) => void;
};

type EmailStatus = "idle" | "sending" | "success" | "error";

const projectOptions = [
  {
    value: "Web Institucional",
    es: "Web Institucional",
    en: "Business website",
  },
  { value: "Landing Page", es: "Landing Page", en: "Landing Page" },
  { value: "Tienda Online", es: "Tienda Online", en: "Online store" },
  { value: "Sistema Web", es: "Sistema Web", en: "Web system" },
  { value: "Otro", es: "Otro", en: "Other" },
] as const;

export default function ContactSection({
  language,
  isDark,
  projectType,
  message,
  onProjectTypeChange,
  onMessageChange,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const copy =
    language === "es"
      ? {
          eyebrow: "Contacto",
          title: "¿Construimos algo",
          accent: "juntos?",
          description:
            "Contame tu idea y veamos cómo podemos llevarla a la web.",
          formTitle: "Contame sobre tu proyecto",
          name: "Nombre completo",
          email: "Email",
          phone: "Teléfono o WhatsApp",
          projectType: "Tipo de proyecto",
          projectPlaceholder: "Seleccioná una opción",
          message: "Mensaje",
          namePlaceholder: "Tu nombre",
          emailPlaceholder: "nombre@correo.com",
          phonePlaceholder: "Número de teléfono",
          messagePlaceholder: "Contame brevemente qué necesitás...",
          sendWhatsApp: "Enviar por WhatsApp",
          sendEmail: "Enviar por email",
          sendingEmail: "Enviando...",
          emailSuccess:
            "Consulta enviada correctamente! Le responderé a la brevedad.",
          emailError:
            "No se pudo enviar la consulta. Intentá nuevamente o contacteme por WhatsApp.",
          whatsapp: "WhatsApp",
          newTab: "se abre en una nueva pestaña",
        }
      : {
          eyebrow: "Contact",
          title: "Shall we build something",
          accent: "together?",
          description:
            "Tell me about your idea and let's see how we can bring it to the web.",
          formTitle: "Tell me about your project",
          name: "Full name",
          email: "Email",
          phone: "Phone or WhatsApp",
          projectType: "Project type",
          projectPlaceholder: "Choose an option",
          message: "Message",
          namePlaceholder: "Your name",
          emailPlaceholder: "you@email.com",
          phonePlaceholder: "+54 11 ...",
          messagePlaceholder: "Briefly tell me what you need...",
          sendWhatsApp: "Send via WhatsApp",
          sendEmail: "Send via email",
          sendingEmail: "Sending...",
          emailSuccess: "Your inquiry was sent successfully! I will reply shortly.",
          emailError:
            "The inquiry could not be sent. Please try again or contact me via WhatsApp.",
          whatsapp: "WhatsApp",
          newTab: "opens in a new tab",
        };

  const contactItems = [
    {
      label: copy.whatsapp,
      value: CONTACT_DETAILS.whatsapp.display,
      href: undefined,
      icon: PhoneIcon,
    },
    {
      label: copy.email,
      value: CONTACT_DETAILS.email,
      href: undefined,
      icon: MailIcon,
    },
    {
      label: "LinkedIn",
      value: CONTACT_DETAILS.linkedin.display,
      href: CONTACT_DETAILS.linkedin.url,
      icon: LinkedinIcon,
    },
    {
      label: "GitHub",
      value: CONTACT_DETAILS.github.display,
      href: CONTACT_DETAILS.github.url,
      icon: GithubIcon,
    },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const field = (name: string) => String(formData.get(name) ?? "").trim();
    const inquiry = {
      name: field("name"),
      email: field("email"),
      phone: field("phone"),
      projectType: field("projectType"),
      message: field("message"),
    };
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;

    if (submitter?.value === "email") {
      if (emailStatus === "sending") return;

      setEmailStatus("sending");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inquiry,
            website: field("website"),
          }),
        });
        const result = (await response.json()) as { ok?: boolean };

        if (!response.ok || result.ok !== true) {
          throw new Error("Email request failed");
        }

        form.reset();
        onProjectTypeChange("");
        onMessageChange("");
        setEmailStatus("success");
      } catch {
        setEmailStatus("error");
      }

      return;
    }

    const whatsappMessage = createProjectInquiryMessage(inquiry);
    window.open(
      createWhatsAppUrl(whatsappMessage),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const fieldClassName = `mt-2 min-h-12 w-full rounded-2xl border px-4 py-3 text-base outline-none transition placeholder:opacity-45 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 ${
    isDark
      ? "border-white/10 bg-white/[0.055] text-white placeholder:text-white"
      : "border-black/10 bg-[#f7f9fc] text-[#111827] placeholder:text-black"
  }`;
  const optionClassName = isDark
    ? "bg-[#111827] text-white"
    : "bg-white text-[#111827]";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="mt-28 scroll-mt-28 pb-24 md:mt-36 md:pb-20"
      aria-labelledby="contact-title"
    >
      <div
        className={`section-reveal grid min-w-0 gap-10 rounded-[2rem] border p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:p-10 ${
          isVisible ? "is-visible" : ""
        } ${
          isDark
            ? "border-white/10 bg-gradient-to-br from-white/[0.075] to-white/[0.025] shadow-[0_24px_80px_rgba(0,0,0,0.16)]"
            : "border-black/10 bg-gradient-to-br from-white to-[#eef3fa] shadow-[0_24px_80px_rgba(17,24,39,0.07)]"
        }`}
      >
        <div className="min-w-0 lg:py-3">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.24em] ${
              isDark ? "text-white/50" : "text-black/45"
            }`}
          >
            {copy.eyebrow}
          </p>
          <h2
            id="contact-title"
            className="mt-4 text-[clamp(2.65rem,4.8vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
          >
            {copy.title} {" "}
            <span className={isDark ? "text-[#4f7cff]" : "text-[#2563eb]"}>
              {copy.accent}
            </span>
          </h2>
          <p
            className={`mt-5 max-w-lg text-base leading-7 md:text-lg ${
              isDark ? "text-white/66" : "text-black/64"
            }`}
          >
            {copy.description}
          </p>

          <div className="mt-9 space-y-3">
            {contactItems.map(({ label, value, href, icon: Icon }) => {
              const baseClassName = `flex min-w-0 items-center gap-4 rounded-2xl border p-3.5 ${
                isDark
                  ? "border-white/[0.08] bg-white/[0.035]"
                  : "border-black/[0.08] bg-white/70"
              }`;
              const content = (
                <>
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      isDark
                        ? "bg-[#4f7cff]/14 text-[#93c5fd]"
                        : "bg-[#dbeafe] text-[#2563eb]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-xs font-semibold uppercase tracking-[0.13em] ${
                        isDark ? "text-white/42" : "text-black/42"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="mt-1 block break-words text-sm font-medium sm:text-base">
                      {value}
                    </span>
                  </span>
                </>
              );

              if (!href) {
                return (
                  <div key={label} className={baseClassName}>
                    {content}
                  </div>
                );
              }

              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}: ${value} (${copy.newTab})`}
                  className={`${baseClassName} transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] ${
                    isDark
                      ? "hover:border-white/15 hover:bg-white/[0.07]"
                      : "hover:border-black/15 hover:bg-white"
                  }`}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>

        <div
          className={`min-w-0 rounded-[1.75rem] border p-5 sm:p-7 ${
            isDark
              ? "border-white/10 bg-[#0e1421]/80 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              : "border-black/10 bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)]"
          }`}
        >
          <h3 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            {copy.formTitle}
          </h3>

          <form className="relative mt-7 space-y-5" onSubmit={handleSubmit}>
            <div
              className="pointer-events-none absolute left-0 top-0 -z-10 h-px w-px overflow-hidden opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="contact-website">Sitio web</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                maxLength={200}
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="contact-name">
                {copy.name}
              </label>
              <input
                className={fieldClassName}
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={copy.namePlaceholder}
                maxLength={100}
                required
              />
            </div>

            <div className="grid min-w-0 gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label className="text-sm font-medium" htmlFor="contact-email">
                  {copy.email}
                </label>
                <input
                  className={fieldClassName}
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={copy.emailPlaceholder}
                  maxLength={254}
                  required
                />
              </div>
              <div className="min-w-0">
                <label className="text-sm font-medium" htmlFor="contact-phone">
                  {copy.phone}
                </label>
                <input
                  className={fieldClassName}
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={copy.phonePlaceholder}
                  maxLength={50}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="contact-project-type">
                {copy.projectType}
              </label>
              <select
                className={fieldClassName}
                id="contact-project-type"
                name="projectType"
                value={projectType}
                onChange={(event) => onProjectTypeChange(event.target.value)}
                required
              >
                <option className={optionClassName} value="" disabled>
                  {copy.projectPlaceholder}
                </option>
                {projectOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className={optionClassName}
                  >
                    {option[language]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="contact-message">
                {copy.message}
              </label>
              <textarea
                className={`${fieldClassName} min-h-36 resize-y`}
                id="contact-message"
                name="message"
                rows={5}
                placeholder={copy.messagePlaceholder}
                value={message}
                onChange={(event) => onMessageChange(event.target.value)}
                maxLength={3000}
                required
              />
            </div>

            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              <button
                type="submit"
                name="deliveryMethod"
                value="whatsapp"
                aria-label={copy.sendWhatsApp}
                className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#4f7cff] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#648bff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                <span>{copy.sendWhatsApp}</span>
              </button>
              <button
                type="submit"
                name="deliveryMethod"
                value="email"
                aria-label={copy.sendEmail}
                aria-busy={emailStatus === "sending"}
                disabled={emailStatus === "sending"}
                className={`inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-65 ${
                  isDark
                    ? "border-white/15 bg-white/[0.055] text-white hover:bg-white/10 focus-visible:ring-offset-[#0e1421]"
                    : "border-black/10 bg-[#f7f9fc] text-[#111827] hover:bg-[#eef2f7] focus-visible:ring-offset-white"
                }`}
              >
                <MailIcon className="h-5 w-5 shrink-0" />
                <span>
                  {emailStatus === "sending"
                    ? copy.sendingEmail
                    : copy.sendEmail}
                </span>
              </button>
            </div>
            <p
              aria-live="polite"
              aria-atomic="true"
              className={`min-h-6 text-sm leading-6 ${
                emailStatus === "success"
                  ? isDark
                    ? "text-emerald-300"
                    : "text-emerald-700"
                  : emailStatus === "error"
                    ? isDark
                      ? "text-rose-300"
                      : "text-rose-700"
                    : isDark
                      ? "text-white/55"
                      : "text-black/55"
              }`}
            >
              {emailStatus === "sending"
                ? copy.sendingEmail
                : emailStatus === "success"
                  ? copy.emailSuccess
                  : emailStatus === "error"
                    ? copy.emailError
                    : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
