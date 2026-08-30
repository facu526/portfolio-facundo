"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";

type Language = "es" | "en";

type Project = {
  name: string;
  description: Record<Language, string>;
  technologies: string[];
  url: string;
  image: string;
  columns: string;
  height: string;
  sizes: string;
};

const projects: Project[] = [
  {
    name: "TRAZA",
    description: {
      es: "E-commerce de indumentaria con catálogo, variantes de producto, carrito, usuarios y checkout, desarrollado con una arquitectura full stack.",
      en: "Fashion e-commerce with product catalog, product variants, cart, user accounts and checkout, built with a full-stack architecture.",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    url: "https://traza-seven.vercel.app/",
    image: "/projects/traza.webp",
    columns: "md:col-span-5",
    height: "h-[360px] sm:h-[400px] md:h-[390px] lg:h-[430px]",
    sizes:
      "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 42vw, 470px",
  },
  {
    name: "Áurea Eventos",
    description: {
      es: "Sitio institucional para un salón de eventos, orientado a presentar sus espacios, propuestas y canales de contacto.",
      en: "Institutional website for an event venue, presenting its spaces, services and contact channels.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://aurea-eventos-muestra.vercel.app/",
    image: "/projects/aurea-eventos.webp",
    columns: "md:col-span-7",
    height: "h-[360px] sm:h-[400px] md:h-[390px] lg:h-[430px]",
    sizes:
      "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 58vw, 670px",
  },
  {
    name: "Sur Amoblamientos",
    description: {
      es: "Sitio comercial para una empresa de muebles a medida, con servicios, proyectos y un proceso de trabajo claro.",
      en: "Commercial website for a custom furniture company, featuring services, projects and a clear work process.",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    url: "https://sur-amoblamientos.vercel.app/",
    image: "/projects/sur-amoblamientos.webp",
    columns: "md:col-span-7",
    height: "h-[360px] sm:h-[400px] md:h-[430px] lg:h-[470px]",
    sizes:
      "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 58vw, 670px",
  },
  {
    name: "Reserva Cancha",
    description: {
      es: "Sistema de reservas deportivas con usuarios, disponibilidad de horarios y administración de canchas.",
      en: "Sports booking system with user accounts, schedule availability and court management.",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    url: "https://reserva-cancha-zeta.vercel.app/",
    image: "/projects/reserva-cancha.webp",
    columns: "md:col-span-5",
    height: "h-[360px] sm:h-[400px] md:h-[430px] lg:h-[470px]",
    sizes:
      "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 42vw, 470px",
  },
  {
    name: "Portfolio Abril Pessano",
    description: {
      es: "Portfolio responsive para una creadora UGC, con presentación profesional, contenido multimedia y galería de videos.",
      en: "Responsive portfolio for a UGC creator, with a professional presentation, multimedia content and video gallery.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://portfolio-abril-pessano.vercel.app/",
    image: "/projects/portfolio-abril.webp",
    columns: "md:col-span-7",
    height: "h-[360px] sm:h-[400px] md:h-[430px] lg:h-[470px]",
    sizes:
      "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 58vw, 670px",
  },
];

type ProjectCardProps = {
  project: Project;
  index: number;
  language: Language;
  isDark: boolean;
  isVisible: boolean;
};

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ProjectCard({
  project,
  index,
  language,
  isDark,
  isVisible,
}: ProjectCardProps) {
  const linkLabel =
    language === "es"
      ? `Abrir proyecto ${project.name} en una nueva pestaña`
      : `Open ${project.name} project in a new tab`;

  return (
    <article
      className={`projects-reveal min-w-0 ${project.columns} ${
        isVisible ? "is-visible" : ""
      }`}
      style={{ "--reveal-delay": `${120 + index * 85}ms` } as CSSProperties}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={linkLabel}
        className={`project-card group relative block w-full overflow-hidden rounded-[16px] ${
          project.height
        } ${
          isDark
            ? "bg-[#111827] ring-1 ring-white/[0.07]"
            : "bg-[#dfe5ef] ring-1 ring-black/[0.08]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${language === "es" ? "Captura de la portada de" : "Homepage screenshot of"} ${project.name}`}
          fill
          sizes={project.sizes}
          className="project-card-image object-cover object-top"
        />

        <div className="project-card-overlay absolute inset-0" />

        <span className="absolute left-5 top-5 z-10 text-[11px] font-semibold tracking-[0.24em] text-white/75">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="project-card-link-icon absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-md">
          <ExternalLinkIcon />
        </span>

        <div className="project-card-content absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="mt-2 hidden max-w-2xl text-sm leading-6 text-white/72 sm:block">
            {project.description[language]}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm sm:text-[11px]"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}

type ProjectsSectionProps = {
  language: Language;
  isDark: boolean;
};

export default function ProjectsSection({
  language,
  isDark,
}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="mt-28 scroll-mt-28 md:mt-36"
      aria-labelledby="projects-title"
    >
      <div
        className={`projects-reveal flex items-end justify-between gap-6 ${
          isVisible ? "is-visible" : ""
        }`}
        style={{ "--reveal-delay": "0ms" } as CSSProperties}
      >
        <h2
          id="projects-title"
          className={`project-editorial-title text-[clamp(3.25rem,8vw,5.75rem)] font-medium italic leading-[0.86] tracking-[-0.045em] ${
            isDark ? "text-white" : "text-[#111827]"
          }`}
        >
          {language === "es" ? "Algunos proyectos" : "Selected projects"}
          <span className="block">
            {language === "es" ? "realizados" : "I’ve built"}
          </span>
        </h2>
        <p
          className={`mb-1 hidden text-xs font-semibold uppercase tracking-[0.28em] sm:block ${
            isDark ? "text-white/40" : "text-black/40"
          }`}
          aria-hidden="true"
        >
          01 — 05
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:mt-14 md:grid-cols-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            language={language}
            isDark={isDark}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}
