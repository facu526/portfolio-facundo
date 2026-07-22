"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  PACKAGE_INQUIRIES,
  type PackageInquiryPrefill,
} from "../lib/package-inquiry";
import { ArrowUpRightIcon, CheckIcon } from "./icons";

type Language = "es" | "en";

type ServicesPricingSectionProps = {
  language: Language;
  isDark: boolean;
  onSelectPlan: (inquiry: PackageInquiryPrefill) => void;
};

const plans = [
  {
    badge: { es: "Ideal para comenzar", en: "Ideal to get started" },
    name: { es: "Landing Page", en: "Landing Page" },
    description: {
      es: "Una página enfocada en presentar tu negocio, servicio o propuesta de forma clara y profesional.",
      en: "A focused page that presents your business, service or proposal clearly and professionally.",
    },
    price: "$300.000 ARS",
    features: {
      es: [
        "Diseño personalizado",
        "Hasta 5 secciones",
        "Adaptación para celulares y computadoras",
        "Contacto directo por WhatsApp",
        "Formulario de contacto",
        "Integración con redes sociales",
        "Optimización de velocidad",
        "Publicación del sitio",
        "30 días de soporte después de la entrega",
      ],
      en: [
        "Custom design",
        "Up to 5 sections",
        "Responsive on mobile and desktop",
        "Direct WhatsApp contact",
        "Contact form",
        "Social media integration",
        "Speed optimization",
        "Site publishing",
        "30 days of post-launch support",
      ],
    },
    inquiry: PACKAGE_INQUIRIES.landingPage,
    featured: false,
  },
  {
    badge: { es: "Más elegido", en: "Most popular" },
    name: { es: "Web Institucional", en: "Business Website" },
    description: {
      es: "Un sitio más completo para presentar el negocio, sus servicios, trabajos e información.",
      en: "A more complete website to present your business, services, work and key information.",
    },
    price: "$450.000 ARS",
    features: {
      es: [
        "Diseño completamente personalizado",
        "Varias páginas o secciones",
        "Presentación de servicios",
        "Galería de imágenes o proyectos",
        "Sección de preguntas frecuentes",
        "Adaptación para celulares y computadoras",
        "Contacto directo por WhatsApp",
        "Formulario de contacto",
        "Integración con redes sociales y ubicación",
        "Optimización básica para buscadores",
        "Optimización de velocidad",
        "Publicación del sitio",
        "30 días de soporte después de la entrega",
      ],
      en: [
        "Fully custom design",
        "Multiple pages or sections",
        "Services presentation",
        "Image or project gallery",
        "Frequently asked questions section",
        "Responsive on mobile and desktop",
        "Direct WhatsApp contact",
        "Contact form",
        "Social media and location integration",
        "Basic search engine optimization",
        "Speed optimization",
        "Site publishing",
        "30 days of post-launch support",
      ],
    },
    inquiry: PACKAGE_INQUIRIES.institutionalWebsite,
    featured: true,
  },
  {
    badge: { es: "E-commerce", en: "E-commerce" },
    name: { es: "Tienda Online", en: "Online Store" },
    description: {
      es: "Una tienda preparada para mostrar productos y comenzar a vender por internet.",
      en: "An online store ready to showcase products and start selling on the internet.",
    },
    price: "$700.000 ARS",
    features: {
      es: [
        "Diseño personalizado",
        "Catálogo de productos",
        "Categorías de productos",
        "Buscador",
        "Carrito de compras",
        "Integración con medios de pago",
        "Contacto directo por WhatsApp",
        "Adaptación para celulares y computadoras",
        "Configuración inicial de productos",
        "Optimización básica para buscadores",
        "Publicación del sitio",
        "30 días de soporte después de la entrega",
      ],
      en: [
        "Custom design",
        "Product catalog",
        "Product categories",
        "Search",
        "Shopping cart",
        "Payment method integration",
        "Direct WhatsApp contact",
        "Responsive on mobile and desktop",
        "Initial product setup",
        "Basic search engine optimization",
        "Site publishing",
        "30 days of post-launch support",
      ],
    },
    inquiry: PACKAGE_INQUIRIES.onlineStore,
    featured: false,
  },
] as const;

export default function ServicesPricingSection({
  language,
  isDark,
  onSelectPlan,
}: ServicesPricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
          eyebrow: "Servicios",
          title: "Servicios y",
          accent: "precios",
          intro:
            "Opciones claras para transformar una idea en una experiencia web profesional.",
          from: "Desde",
          includes: "El paquete incluye",
          button: "Consultar este paquete",
          note: "Los valores son orientativos y pueden variar según las funciones y el alcance de cada proyecto. El dominio, el mantenimiento y los servicios externos se cotizan por separado.",
          aria: (planName: string) =>
            `Completar el formulario de contacto para consultar el paquete ${planName}`,
        }
      : {
          eyebrow: "Services",
          title: "Services and",
          accent: "pricing",
          intro:
            "Clear options to turn an idea into a professional web experience.",
          from: "From",
          includes: "What is included",
          button: "Ask about this package",
          note: "Prices are estimates and may vary depending on each project's features and scope. Domain, maintenance and external services are quoted separately.",
          aria: (planName: string) =>
            `Fill in the contact form to ask about the ${planName} package`,
        };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative left-1/2 isolate mt-28 w-[min(1320px,calc(100vw-2rem))] -translate-x-1/2 scroll-mt-40 md:mt-36 xl:scroll-mt-28"
      aria-labelledby="pricing-title"
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-3 right-0 -z-10 select-none text-[clamp(6rem,17vw,13rem)] font-black lowercase leading-none tracking-[-0.08em] ${
          isDark ? "text-white/[0.025]" : "text-[#2563eb]/[0.035]"
        }`}
      >
        {copy.accent}
      </span>

      <div
        className={`section-reveal relative z-10 max-w-3xl ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <p
          className={`text-sm font-semibold uppercase tracking-[0.24em] ${
            isDark ? "text-white/50" : "text-black/45"
          }`}
        >
          {copy.eyebrow}
        </p>
        <h2
          id="pricing-title"
          className="mt-4 text-[clamp(2.7rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
        >
          {copy.title} {" "}
          <span className={isDark ? "text-[#4f7cff]" : "text-[#2563eb]"}>
            {copy.accent}
          </span>
        </h2>
        <p
          className={`mt-5 max-w-2xl text-base leading-7 md:text-lg ${
            isDark ? "text-white/65" : "text-black/62"
          }`}
        >
          {copy.intro}
        </p>
      </div>

      <div className="relative z-10 mt-12 grid min-w-0 items-stretch gap-6 md:grid-cols-2 xl:mt-20 xl:grid-cols-3 xl:gap-0">
        {plans.map((plan, index) => (
          <article
            key={plan.name.es}
            className={`section-reveal relative min-w-0 ${
              plan.featured ? "xl:z-20" : "xl:z-10 xl:pt-10"
            } ${
              index === 2
                ? "md:col-span-2 md:w-[calc(50%-0.75rem)] md:justify-self-center xl:col-span-1 xl:w-auto"
                : ""
            } ${isVisible ? "is-visible" : ""}`}
            style={{ "--reveal-delay": `${120 + index * 90}ms` } as CSSProperties}
          >
            <div
              className={`pricing-card flex h-full min-w-0 flex-col rounded-[1.75rem] border p-6 sm:p-7 xl:px-8 xl:py-9 ${
                plan.featured ? "pricing-card-featured" : ""
              } ${
                isDark
                  ? plan.featured
                    ? "border-[#4f7cff]/75 bg-[#14203b] shadow-[0_28px_80px_rgba(36,75,170,0.3)]"
                    : "border-white/12 bg-[#121722] shadow-[0_20px_55px_rgba(0,0,0,0.22)]"
                  : plan.featured
                    ? "border-[#2563eb]/50 bg-[#eef4ff] shadow-[0_28px_80px_rgba(37,99,235,0.17)]"
                    : "border-black/10 bg-white shadow-[0_20px_55px_rgba(17,24,39,0.09)]"
              }`}
            >
              <span
                className={`inline-flex w-fit rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${
                  plan.featured
                    ? isDark
                      ? "border-[#60a5fa]/40 bg-[#4f7cff]/18 text-[#93c5fd]"
                      : "border-[#2563eb]/25 bg-[#dbeafe] text-[#1d4ed8]"
                    : isDark
                      ? "border-white/10 bg-white/5 text-white/55"
                      : "border-black/10 bg-[#f5f7fb] text-black/50"
                }`}
              >
                {plan.badge[language]}
              </span>

              <h3 className="mt-5 text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[2.1rem]">
                {plan.name[language]}
              </h3>
              <p
                className={`mt-4 text-sm leading-6 xl:min-h-[7.5rem] ${
                  isDark ? "text-white/62" : "text-black/60"
                }`}
              >
                {plan.description[language]}
              </p>

              <div className="mt-7">
                <span
                  className={`block text-xs font-bold uppercase tracking-[0.18em] ${
                    isDark ? "text-white/45" : "text-black/42"
                  }`}
                >
                  {copy.from}
                </span>
                <p className="mt-2 break-words text-[clamp(2rem,3.1vw,2.6rem)] font-bold leading-none tracking-[-0.045em]">
                  {plan.price}
                </p>
              </div>

              <div
                className={`my-7 h-px ${
                  isDark ? "bg-white/10" : "bg-black/10"
                }`}
              />

              <p
                className={`text-xs font-bold uppercase tracking-[0.18em] ${
                  isDark ? "text-white/45" : "text-black/42"
                }`}
              >
                {copy.includes}
              </p>
              <ul className="mt-5 space-y-3.5">
                {plan.features[language].map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-sm leading-5 ${
                      isDark ? "text-white/72" : "text-black/68"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        isDark
                          ? "bg-[#4f7cff]/20 text-[#93c5fd]"
                          : "bg-[#dbeafe] text-[#2563eb]"
                      }`}
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.inquiry)}
                  aria-controls="contact"
                  aria-label={copy.aria(plan.name[language])}
                  className={`inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 text-center text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 ${
                    plan.featured
                      ? "bg-[#4f7cff] text-white hover:bg-[#648bff] focus-visible:ring-offset-[#111827]"
                      : isDark
                        ? "bg-white text-[#0b0f19] hover:bg-white/90 focus-visible:ring-offset-[#0b0f19]"
                        : "bg-[#111827] text-white hover:bg-[#273449] focus-visible:ring-offset-white"
                  }`}
                >
                  <span>{copy.button}</span>
                  <ArrowUpRightIcon className="h-4 w-4 shrink-0" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p
        className={`section-reveal relative z-10 mx-auto mt-12 max-w-4xl text-center text-xs leading-6 sm:text-sm ${
          isVisible ? "is-visible" : ""
        } ${isDark ? "text-white/42" : "text-black/45"}`}
        style={{ "--reveal-delay": "420ms" } as CSSProperties}
      >
        {copy.note}
      </p>
    </section>
  );
}
