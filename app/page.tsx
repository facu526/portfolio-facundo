"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import ProjectsSection from "./components/projects-section";
import ServicesContactFlow from "./components/services-contact-flow";
import TypewriterText from "./components/typewriter-text";
import WhatsAppFloatingButton from "./components/whatsapp-floating-button";

type Language = "es" | "en";
type Theme = "dark" | "light";

const phrases = [
  "Desarrollador web full stack",
  "Aplicaciones web para negocios",
] as const;

type SkillRowProps = {
  items: string[];
  reverse?: boolean;
  isDark: boolean;
};

function SkillRow({ items, reverse = false, isDark }: SkillRowProps) {
  const loopItems = [...items, ...items];

  return (
    <div className="skill-marquee-wrapper">
      <div
        className={`skill-marquee-track ${reverse ? "skill-marquee-reverse" : ""}`}
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`skill-pill ${
              isDark
                ? "border-white/10 bg-white/5 text-white/80"
                : "border-[#cfe0ff] bg-white text-[#4b5563]"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isDark ? "bg-white/50" : "bg-[#94b8ff]"
              }`}
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeSection, setActiveSection] = useState("home");

  const isDark = theme === "dark";

  useEffect(() => {
    const ids = [
      "home",
      "proyectos",
      "experience",
      "skills",
      "about",
      "services",
      "contact",
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 140;

      let current = "home";

      for (const id of ids) {
        const element =
          id === "home"
            ? document.getElementById("home-section")
            : document.getElementById(id);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollY >= top && scrollY < top + height) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const content = useMemo(() => {
    const data = {
      es: {
        nav: {
          home: "INICIO",
          experience: "EXPERIENCIA",
          projects: "PROYECTOS",
          skills: "HABILIDADES",
          about: "SOBRE MÍ",
          contact: "CONTACTO",
        },
        heroTitle: "Facundo",
        heroTitleAccent: "Sanchez",
        heroDescription:
          "Creo productos digitales claros, funcionales y pensados para resolver necesidades reales.",
        locationBadge: "Monte Grande, Argentina",
        viewProjects: "Ver proyectos",
        contactMe: "Contactarme",
        aboutLabel: "Sobre mí",
        aboutTitle: "Quién soy",
        aboutText:
          "Soy Facundo Sanchez, estudiante avanzado de Ingeniería en Informática. Me interesa convertir ideas en productos que realmente puedan usarse y no quedarme únicamente con lo académico. Por eso, además de formarme, desarrollo proyectos reales para negocios y personas, desde sitios institucionales hasta sistemas de reservas y gestión.\n\nMe gusta involucrarme en todo el proceso: entender el problema, pensar una solución clara, construirla y mejorarla hasta que funcione bien. Busco seguir creciendo como desarrollador, participar en proyectos desafiantes y crear soluciones que tengan una utilidad concreta.",
        skillsLabel: "Habilidades",
        skillsTitle: "Tecnologías, herramientas y enfoque",
        experienceLabel: "Experiencia",
        experienceTitle: "Formación y recorrido profesional",
        professionalExperience: "Experiencia profesional",
        experienceRole: "Desarrollo Web Freelance — Proyectos independientes y para negocios",
        experienceDate: "2026 — Actualidad",
        experienceItems: [
          "Desarrollo de sitios web personalizados, desde la idea inicial hasta su publicación.",
          "Creación de landing pages, sitios institucionales, e-commerce y aplicaciones web.",
          "Desarrollo de funcionalidades como autenticación, bases de datos, paneles de administración, reservas y formularios.",
          "Diseño de interfaces responsive adaptadas a celulares, tablets y computadoras.",
          "Integración de servicios externos, APIs, sistemas de contacto y herramientas de automatización.",
          "Deploy, configuración y mantenimiento de proyectos utilizando GitHub y Vercel.",
          "Trabajo con tecnologías como Next.js, React, TypeScript, Tailwind CSS, Supabase y PostgreSQL.",
        ],
        education: "Educación",
        educationTitle: "Ingeniería en Informática — UADE",
        educationDate: "2022 — Actualidad | Cursando 5.º año",
        secondaryEducation: "Educación secundaria",
        secondarySchool: "Instituto Grilli Monte Grande (2016 — 2021)",
        secondaryDegree: "Bachiller con orientación en economía",
        coursesCertifications: "Cursos y certificaciones",
        course1: "JavaScript: Desde cero con NodeJS — Udemy",
        course2: "First Certificate in English (FCE) — Cambridge, nivel B2",
        languages: "Idiomas",
        language1: "Español: nativo",
        language2: "Inglés: avanzado",
        projectsLabel: "Proyectos",
        projectsTitle: "Proyecto destacado",
        projectsDescription:
          "Una muestra real de mi enfoque: construir productos web claros, responsive y orientados a resolver una necesidad concreta de negocio.",
        projectStatus1: "Proyecto desarrollado",
        project1Title: "Plataforma de Reservas de Canchas",
        project1Description:
          "Aplicación web orientada a complejos deportivos para presentar canchas, disponibilidad, información del negocio y facilitar la reserva por parte de los usuarios.\n\nEl proyecto fue desarrollado con foco en una experiencia simple, visual y responsive, pensada para que el usuario pueda consultar información rápidamente desde celular o escritorio y avanzar al contacto o reserva sin fricción.",
        project1Features: [
          "Landing page profesional para complejo deportivo.",
          "Sección de canchas y servicios.",
          "Diseño responsive para mobile y desktop.",
          "Comunicación clara de horarios, disponibilidad y propuesta del negocio.",
          "Enfoque comercial orientado a conversión y reservas.",
          "Base preparada para futuras mejoras como panel administrativo, disponibilidad dinámica y gestión de horarios.",
        ],
        projectDemo: "Ver demo",
        roleSubtitle: "Ingeniería en Informática | Desarrollador Web Full Stack",
        languageButton: "EN",
      },
      en: {
        nav: {
          home: "HOME",
          experience: "EXPERIENCE",
          projects: "PROJECTS",
          skills: "SKILLS",
          about: "ABOUT",
          contact: "CONTACT",
        },
        heroTitle: "Facundo",
        heroTitleAccent: "Sanchez",
        heroDescription:
          "I create clear, functional digital products designed to solve real needs.",
        locationBadge: "Monte Grande, Argentina",
        viewProjects: "View projects",
        contactMe: "Contact me",
        aboutLabel: "About",
        aboutTitle: "Who I am",
        aboutText:
          "I am Facundo Sanchez, an advanced Computer Engineering student. I am interested in turning ideas into products people can actually use instead of limiting myself to academic work. Alongside my studies, I build real projects for businesses and individuals, from institutional websites to booking and management systems.\n\nI like being involved throughout the process: understanding the problem, defining a clear solution, building it and improving it until it works well. I want to keep growing as a developer, contribute to challenging projects and create solutions with concrete value.",
        skillsLabel: "Skills",
        skillsTitle: "Technologies, tools and focus areas",
        experienceLabel: "Experience",
        experienceTitle: "Education and professional background",
        professionalExperience: "Professional Experience",
        experienceRole: "Freelance Web Development — Independent and Business Projects",
        experienceDate: "2026 — Present",
        experienceItems: [
          "Development of custom websites, from the initial idea through publication.",
          "Creation of landing pages, corporate websites, e-commerce sites, and web applications.",
          "Development of features such as authentication, databases, admin dashboards, booking systems, and forms.",
          "Design of responsive interfaces adapted to mobile phones, tablets, and computers.",
          "Integration of external services, APIs, contact systems, and automation tools.",
          "Deployment, configuration, and maintenance of projects using GitHub and Vercel.",
          "Work with technologies such as Next.js, React, TypeScript, Tailwind CSS, Supabase, and PostgreSQL.",
        ],
        education: "Education",
        educationTitle: "Computer Engineering — UADE",
        educationDate: "2022 — Present | Currently in 5th year",
        secondaryEducation: "Secondary Education",
        secondarySchool: "Instituto Grilli Monte Grande (2016 — 2021)",
        secondaryDegree: "Economics-oriented high school diploma",
        coursesCertifications: "Courses & Certifications",
        course1: "JavaScript: Desde cero con NodeJS — Udemy",
        course2: "First Certificate in English (FCE) — Cambridge, B2 level",
        languages: "Languages",
        language1: "Spanish: Native",
        language2: "English: Advanced",
        projectsLabel: "Projects",
        projectsTitle: "Featured project",
        projectsDescription:
          "A real example of my approach: building clear, responsive web products focused on solving a concrete business need.",
        projectStatus1: "Developed project",
        project1Title: "Sports Court Booking Platform",
        project1Description:
          "Web application designed for sports facilities to showcase courts, availability, business information and help users move quickly toward booking or contacting the venue.\n\nThe project was developed with a simple, visual and responsive experience in mind, so users can quickly check information from mobile or desktop and move toward contact or booking without friction.",
        project1Features: [
          "Professional landing page for a sports facility.",
          "Courts and services section.",
          "Responsive design for mobile and desktop.",
          "Clear communication of schedules, availability and business value proposition.",
          "Commercial approach focused on conversion and bookings.",
          "Foundation prepared for future improvements such as an admin panel, dynamic availability and schedule management.",
        ],
        projectDemo: "View demo",
        roleSubtitle: "Computer Engineering | Full Stack Web Developer",
        languageButton: "ES",
      },
    };

    return data[language];
  }, [language]);

  const skillsRow1 = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Responsive Design",
    "Clean UI",
  ];

  const skillsRow2 =
    language === "es"
      ? [
          "Node.js",
          "APIs REST",
          "Prisma",
          "Autenticación",
          "Lógica de negocio",
          "CRUD Apps",
          "PostgreSQL",
          "SQL",
          "SQL Server",
          "MySQL",
          "Neo4j",
          "Modelado de datos",
        ]
      : [
          "Node.js",
          "REST APIs",
          "Prisma",
          "Authentication",
          "Business logic",
          "CRUD Apps",
          "PostgreSQL",
          "SQL",
          "SQL Server",
          "MySQL",
          "Neo4j",
          "Data modeling",
        ];

  const skillsRow3 =
    language === "es"
      ? [
          "Git",
          "GitHub",
          "VS Code",
          "Docker",
          "Postman",
          "Vercel",
          "Automatización de procesos",
          "IA aplicada",
          "Integración de herramientas",
          "Productividad digital",
          "Asistentes con IA",
        ]
      : [
          "Git",
          "GitHub",
          "VS Code",
          "Docker",
          "Postman",
          "Vercel",
          "Process automation",
          "Applied AI",
          "Tool integration",
          "Digital productivity",
          "AI assistants",
        ];

  const navItems = [
    { id: "home", href: "#home-section", label: content.nav.home },
    { id: "proyectos", href: "#proyectos", label: content.nav.projects },
    { id: "experience", href: "#experience", label: content.nav.experience },
    { id: "skills", href: "#skills", label: content.nav.skills },
    { id: "about", href: "#about", label: content.nav.about },
    { id: "contact", href: "#contact", label: content.nav.contact },
  ];

  return (
    <main
      style={
        {
          "--marquee-fade": isDark ? "#0b0f19" : "#f5f7fb",
        } as CSSProperties
      }
      className={`min-h-screen overflow-x-clip transition-colors duration-300 ${
        isDark ? "bg-[#0b0f19] text-white" : "bg-[#f5f7fb] text-[#111827]"
      }`}
    >
      <section className="mx-auto max-w-6xl px-6 py-4 md:px-10 lg:px-12">
        <header className="sticky top-0 z-50 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav
              className={`flex w-full min-w-0 items-center gap-1 overflow-x-auto rounded-full border px-2 py-2 shadow-lg backdrop-blur md:w-auto md:overflow-visible ${
                isDark
                  ? "border-white/10 bg-[#1b1b1b]/80"
                  : "border-black/10 bg-white/90"
              }`}
            >
              {navItems.map((item) => {
                const active = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-xs font-bold tracking-[0.22em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] md:px-5 ${
                      active
                        ? isDark
                          ? "bg-[#1f3b67] text-[#60a5fa]"
                          : "bg-[#dbeafe] text-[#2563eb]"
                        : isDark
                        ? "text-white/85 hover:bg-white/5"
                        : "text-black/75 hover:bg-black/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className={`rounded-full border px-4 py-2 text-xs font-bold tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] ${
                  isDark
                    ? "border-white/10 bg-[#1b1b1b]/80 text-white hover:bg-white/10"
                    : "border-black/10 bg-white/90 text-black hover:bg-black/5"
                }`}
              >
                {content.languageButton}
              </button>

              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] ${
                  isDark
                    ? "border-white/10 bg-[#1b1b1b]/80 text-yellow-300 hover:bg-white/10"
                    : "border-black/10 bg-white/90 text-[#111827] hover:bg-black/5"
                }`}
              >
                {isDark ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.05 4.11a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L7.05 5.17a.75.75 0 0 1 0-1.06ZM16.89 4.11a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06ZM12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5ZM3.75 12a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM18 11.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H18ZM7.05 18.83a.75.75 0 0 0 0 1.06.75.75 0 0 0 1.06 0l1.06-1.06a.75.75 0 0 0-1.06-1.06l-1.06 1.06ZM16.89 17.77a.75.75 0 1 0-1.06 1.06l1.06 1.06a.75.75 0 1 0 1.06-1.06l-1.06-1.06ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 0 1 .162.82 8.25 8.25 0 0 0 11.771 10.36.75.75 0 0 1 1.016.88A10.503 10.503 0 1 1 10.41 1.556a.75.75 0 0 1 .882.162l-.004.004a.75.75 0 0 1-.82-.004 9 9 0 1 0 10.756 10.757.75.75 0 0 1-.005-.82l.005-.004a.75.75 0 0 1 .162.882A10.5 10.5 0 0 1 9.528 1.718Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        <section
          id="home-section"
          className="grid scroll-mt-28 items-center gap-10 pb-8 pt-16 md:grid-cols-[1.4fr_0.8fr] md:pt-20"
        >
          <div>
            <div className="max-w-4xl">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                {content.heroTitle}{" "}
                <span
                  className={
                    isDark ? "font-bold text-white" : "font-bold text-[#111827]"
                  }
                >
                  {content.heroTitleAccent}
                </span>
              </h1>

              <div className="mt-3 min-h-[5.5rem] md:min-h-[7.5rem]">
                <TypewriterText
                  phrases={phrases}
                  className={`break-words text-3xl font-semibold italic leading-tight md:text-5xl ${
                    isDark ? "text-[#4f7cff]" : "text-[#2563eb]"
                  }`}
                />
              </div>

              <p
                className={`mt-8 max-w-xl text-base leading-7 md:text-lg ${
                  isDark ? "text-white/75" : "text-black/70"
                }`}
              >
                {content.heroDescription}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#proyectos"
                className={`rounded-2xl px-6 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 ${
                  isDark
                    ? "bg-white text-black hover:opacity-90 focus-visible:ring-offset-[#0b0f19]"
                    : "bg-[#111827] text-white hover:opacity-90 focus-visible:ring-offset-[#f5f7fb]"
                }`}
              >
                {content.viewProjects}
              </a>
              <a
                href="#contact"
                className={`rounded-2xl border px-6 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10 focus-visible:ring-offset-[#0b0f19]"
                    : "border-black/10 text-black hover:bg-black/5 focus-visible:ring-offset-[#f5f7fb]"
                }`}
              >
                {content.contactMe}
              </a>
            </div>

            <div className="mt-8">
              <div
                className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/75"
                    : "border-black/10 bg-white text-black/70"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                    isDark ? "bg-white/10 text-white/80" : "bg-[#eef2ff] text-[#2563eb]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351a.75.75 0 0 0 .92 0c.701-.555 6.79-5.558 6.79-11.101a7.25 7.25 0 1 0-14.5 0c0 5.543 6.089 10.546 6.79 11.1ZM12 14.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>{content.locationBadge}</span>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div
              className={`overflow-hidden rounded-3xl border p-4 shadow-2xl ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white"
              }`}
            >
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl ${
                  isDark ? "bg-white/10" : "bg-[#e5e7eb]"
                }`}
              >
                <Image
                  src="/profile.png"
                  alt="Facundo Sanchez"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 80px), 384px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection language={language} isDark={isDark} />

        <section id="experience" className="mt-24 scroll-mt-28">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
              isDark ? "text-white/50" : "text-black/45"
            }`}
          >
            {content.experienceLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {content.experienceTitle}
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div
              className={`rounded-3xl border p-7 ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white"
              }`}
            >
              <p className={isDark ? "text-sm text-white/50" : "text-sm text-black/50"}>
                {content.professionalExperience}
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {content.experienceRole}
              </h3>
              <p className={isDark ? "mt-2 text-sm text-white/60" : "mt-2 text-sm text-black/55"}>
                {content.experienceDate}
              </p>

              <ul className={isDark ? "mt-5 list-disc space-y-3 pl-5 text-white/75" : "mt-5 list-disc space-y-3 pl-5 text-black/70"}>
                {content.experienceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div
              className={`rounded-3xl border p-7 ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white"
              }`}
            >
              <p className={isDark ? "text-sm text-white/50" : "text-sm text-black/50"}>
                {content.education}
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {content.educationTitle}
              </h3>
              <p className={isDark ? "mt-2 text-sm text-white/60" : "mt-2 text-sm text-black/55"}>
                {content.educationDate}
              </p>

              <div className={isDark ? "mt-6 space-y-5 text-white/75" : "mt-6 space-y-5 text-black/70"}>
                <div>
                  <p className="font-medium">{content.secondaryEducation}</p>
                  <p className={isDark ? "text-sm text-white/65" : "text-sm text-black/60"}>
                    {content.secondarySchool}
                  </p>
                  <p className={isDark ? "text-sm text-white/65" : "text-sm text-black/60"}>
                    {content.secondaryDegree}
                  </p>
                </div>

                <div>
                  <p className="font-medium">{content.coursesCertifications}</p>
                  <p className={isDark ? "text-sm text-white/65" : "text-sm text-black/60"}>
                    {content.course1}
                  </p>
                  <p className={isDark ? "text-sm text-white/65" : "text-sm text-black/60"}>
                    {content.course2}
                  </p>
                </div>

                <div>
                  <p className="font-medium">{content.languages}</p>
                  <p className={isDark ? "text-sm text-white/65" : "text-sm text-black/60"}>
                    {content.language1}
                  </p>
                  <p className={isDark ? "text-sm text-white/65" : "text-sm text-black/60"}>
                    {content.language2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mt-24 scroll-mt-28">
          <p
            className={`text-center text-sm font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-white/50" : "text-black/45"
            }`}
          >
            {content.skillsLabel}
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight">
            {content.skillsTitle}
          </h2>

          <div className="mt-10 space-y-5">
            <SkillRow items={skillsRow1} isDark={isDark} />
            <SkillRow items={skillsRow2} reverse isDark={isDark} />
            <SkillRow items={skillsRow3} isDark={isDark} />
          </div>
        </section>

        <section id="about" className="mt-24 scroll-mt-28">
          <div className="grid items-center gap-10 md:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div className="order-2 mx-auto w-full max-w-xs md:order-1">
              <div
                className={`overflow-hidden rounded-3xl border p-3 ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-black/10 bg-white"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/profile.png"
                    alt="Facundo Sanchez"
                    fill
                    sizes="(max-width: 767px) calc(100vw - 96px), 320px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p
                className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                  isDark ? "text-white/50" : "text-black/45"
                }`}
              >
                {content.aboutLabel}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {content.aboutTitle}
              </h2>
              <div
                className={`mt-6 max-w-[68ch] space-y-5 text-base leading-8 ${
                  isDark ? "text-white/75" : "text-black/70"
                }`}
              >
                {content.aboutText.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServicesContactFlow language={language} isDark={isDark} />
      </section>

      <WhatsAppFloatingButton language={language} isDark={isDark} />
    </main>
  );
}
