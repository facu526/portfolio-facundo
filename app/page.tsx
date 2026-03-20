"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";

type Language = "es" | "en";
type Theme = "dark" | "light";

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

  const fullText = "FullStack Developer";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 55 : 95;
    const pauseTime = 1200;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = fullText.slice(0, typedText.length + 1);
        setTypedText(next);

        if (next === fullText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        const next = fullText.slice(0, typedText.length - 1);
        setTypedText(next);

        if (next.length === 0) {
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, fullText]);

  useEffect(() => {
    const ids = ["home", "experience", "projects", "skills", "about", "contact"];

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
          home: "HOME",
          experience: "EXPERIENCE",
          projects: "PROJECTS",
          skills: "SKILLS",
          about: "ABOUT",
          contact: "CONTACT",
        },
        topBadge: "Disponible para pasantías y oportunidades junior",
        heroTitle: "Facundo",
        heroTitleAccent: "Sanchez",
        heroDescription:
          "Soy estudiante avanzado de Ingeniería en Informática en UADE, enfocado en desarrollo de software, resolución práctica de problemas y construcción de productos digitales con valor real.",
        heroExtraText:
          "Construyendo aplicaciones web útiles y creciendo como desarrollador de software.",
        locationBadge: "Monte Grande, Argentina",
        viewProjects: "Ver proyectos",
        contactMe: "Contactarme",
        aboutLabel: "Sobre mí",
        aboutTitle: "Quién soy",
        aboutText:
          "Actualmente estoy cursando el quinto año de la carrera de Ingeniería en Informática en la Universidad Argentina de la Empresa (UADE). Tengo un gran interés en el desarrollo de software y en la creación de soluciones digitales prácticas que resuelvan problemas reales. Busco seguir creciendo profesionalmente a través de proyectos reales, experiencia práctica y aprendizaje continuo.",
        skillsLabel: "Skills",
        skillsTitle: "Tecnologías y herramientas",
        experienceLabel: "Experiencia",
        experienceTitle: "Formación y recorrido profesional",
        professionalExperience: "Experiencia profesional",
        experienceRole: "Pasantía en Mantenimiento de Sistemas — Grupo ODIM",
        experienceDate: "Abril 2025 — Septiembre 2025",
        experienceItems: [
          "Mantenimiento preventivo y correctivo de sistemas internos.",
          "Soporte técnico a usuarios, software y hardware.",
          "Documentación de procesos y asistencia interna.",
          "Configuración básica de equipos, redes y sistemas.",
          "Colaboración con el área IT para asegurar continuidad operativa.",
        ],
        education: "Educación",
        educationTitle: "Ingeniería en Informática — UADE",
        educationDate: "2022 — Actualidad | Cursando 5.º año",
        secondaryEducation: "Educación secundaria",
        secondarySchool: "Instituto Grilli Monte Grande (2016 — 2021)",
        secondaryDegree: "Bachiller con orientación en economía",
        coursesCertifications: "Cursos y certificaciones",
        course1: "JavaScript: Desde cero con NodeJS — UDEMY",
        course2: "First Certificate in English (FCE) — Cambridge, Nivel B2",
        languages: "Idiomas",
        language1: "Español: Nativo",
        language2: "Inglés: Avanzado",
        projectsLabel: "Proyectos",
        projectsTitle: "Trabajo actual y planificado",
        projectsDescription:
          "Actualmente estoy enfocado en construir aplicaciones prácticas que ayuden a resolver necesidades reales. Estos son los principales proyectos en los que estoy trabajando o que planeo desarrollar próximamente.",
        projectStatus1: "En desarrollo",
        projectStatus2: "Proyecto planificado",
        projectStatus3: "Proyecto planificado",
        project1Title: "App de Seguimiento de Gimnasio",
        project1Description:
          "Aplicación web para registrar entrenamientos, ejercicios, series y progreso físico. Pensada para uso real y orientada a mejorar el seguimiento personal dentro del gimnasio.",
        project2Title: "CV Builder / Gestor de CVs",
        project2Description:
          "Sistema web para crear, organizar y gestionar currículums de manera práctica. Enfocado en automatizar y simplificar la generación de perfiles profesionales.",
        project3Title: "App Full Stack de Gestión",
        project3Description:
          "Aplicación CRUD completa con autenticación, base de datos y panel de administración. Proyecto orientado a reforzar experiencia práctica en frontend y backend.",
        contactLabel: "Contacto",
        contactTitle: "Conectemos",
        contactDescription:
          "Estoy interesado en pasantías, roles junior y oportunidades para seguir aprendiendo mientras construyo productos reales y gano experiencia profesional.",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        phone: "Teléfono",
        roleSubtitle: "Ingeniería en Informática | Desarrollador Web",
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
        topBadge: "Available for internships and junior opportunities",
        heroTitle: "Facundo",
        heroTitleAccent: "Sanchez",
        heroDescription:
          "I am an advanced Information Systems Engineering student at UADE, focused on software development, practical problem-solving, and building digital products with real-world value.",
        heroExtraText:
          "Building useful web apps and growing as a software developer.",
        locationBadge: "Monte Grande, Argentina",
        viewProjects: "View projects",
        contactMe: "Contact me",
        aboutLabel: "About",
        aboutTitle: "Who I am",
        aboutText:
          "I am currently in the fifth year of my Information Systems Engineering degree at Universidad Argentina de la Empresa (UADE). I have a strong interest in software development and in creating practical digital solutions that solve real problems. I am looking to continue growing professionally through real projects, hands-on experience, and continuous learning.",
        skillsLabel: "Skills",
        skillsTitle: "Technologies and tools",
        experienceLabel: "Experience",
        experienceTitle: "Education and professional background",
        professionalExperience: "Professional Experience",
        experienceRole: "Systems Maintenance Intern — Grupo ODIM",
        experienceDate: "April 2025 — September 2025",
        experienceItems: [
          "Preventive and corrective maintenance of internal systems.",
          "Technical support for users, software, and hardware.",
          "Process documentation and internal assistance.",
          "Basic configuration of equipment, networks, and systems.",
          "Collaboration with the IT area to support operational continuity.",
        ],
        education: "Education",
        educationTitle: "Information Systems Engineering — UADE",
        educationDate: "2022 — Present | Currently in 5th year",
        secondaryEducation: "Secondary Education",
        secondarySchool: "Instituto Grilli Monte Grande (2016 — 2021)",
        secondaryDegree: "Economics-oriented high school diploma",
        coursesCertifications: "Courses & Certifications",
        course1: "JavaScript: Desde cero con NodeJS — UDEMY",
        course2: "First Certificate in English (FCE) — Cambridge, B2 Level",
        languages: "Languages",
        language1: "Spanish: Native",
        language2: "English: Advanced",
        projectsLabel: "Projects",
        projectsTitle: "Current and planned work",
        projectsDescription:
          "I am currently focused on building practical applications that help solve real needs. These are the main projects I am working on or planning to develop next.",
        projectStatus1: "Currently Building",
        projectStatus2: "Planned Project",
        projectStatus3: "Planned Project",
        project1Title: "Gym Tracking App",
        project1Description:
          "Web application to track workouts, exercises, sets, and physical progress. Designed for real use and focused on improving personal training follow-up.",
        project2Title: "CV Builder / CV Manager",
        project2Description:
          "Web system to create, organize, and manage resumes in a practical way. Focused on automating and simplifying professional profile creation.",
        project3Title: "Full Stack Management App",
        project3Description:
          "Complete CRUD application with authentication, database, and admin panel. Project focused on strengthening practical frontend and backend experience.",
        contactLabel: "Contact",
        contactTitle: "Let’s connect",
        contactDescription:
          "I am interested in internships, junior roles, and opportunities to keep learning while building real products and gaining professional experience.",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        phone: "Phone",
        roleSubtitle: "Information Systems Engineering | Web Developer",
        languageButton: "ES",
      },
    };

    return data[language];
  }, [language]);

  const skillsRow1 = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
  ];

  const skillsRow2 = [
    "Git",
    "GitHub",
    "Docker",
    "REST APIs",
    "Java",
    "Python",
    "SQL",
    "PostgreSQL",
    "Prisma",
  ];

  const skillsRow3 = [
    "CRUD Apps",
    "Authentication",
    "Database Design",
    "Problem Solving",
    "Clean UI",
    "Responsive Design",
    "Frontend",
    "Backend",
    "Full Stack",
  ];

  const projects = [
    {
      title: content.project1Title,
      description: content.project1Description,
      stack: ["Next.js", "React", "Prisma", "PostgreSQL"],
      status: content.projectStatus1,
    },
    {
      title: content.project2Title,
      description: content.project2Description,
      stack: ["Next.js", "React", "Node.js", "SQL"],
      status: content.projectStatus2,
    },
    {
      title: content.project3Title,
      description: content.project3Description,
      stack: ["React", "Node.js", "PostgreSQL", "Docker"],
      status: content.projectStatus3,
    },
  ];

  const navItems = [
    { id: "home", href: "#home-section", label: content.nav.home },
    { id: "experience", href: "#experience", label: content.nav.experience },
    { id: "projects", href: "#projects", label: content.nav.projects },
    { id: "skills", href: "#skills", label: content.nav.skills },
    { id: "about", href: "#about", label: content.nav.about },
  ];

  return (
    <main
      style={
        {
          "--marquee-fade": isDark ? "#0b0f19" : "#f5f7fb",
        } as CSSProperties
      }
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#0b0f19] text-white" : "bg-[#f5f7fb] text-[#111827]"
      }`}
    >
      <section className="mx-auto max-w-6xl px-6 py-4 md:px-10 lg:px-12">
        <header className="sticky top-0 z-50 pt-2">
          <div className="flex items-center justify-between gap-4">
            <nav
              className={`flex items-center gap-1 rounded-full border px-2 py-2 shadow-lg backdrop-blur ${
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
                    className={`rounded-full px-4 py-2 text-xs font-bold tracking-[0.22em] transition md:px-5 ${
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
                className={`rounded-full border px-4 py-2 text-xs font-bold tracking-[0.18em] transition ${
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
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
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
          className="grid items-center gap-10 pt-16 md:grid-cols-[1.4fr_0.8fr]"
        >
          <div>
            <p
              className={`mb-3 inline-block rounded-full border px-4 py-1 text-sm ${
                isDark
                  ? "border-white/15 bg-white/5 text-white/80"
                  : "border-black/10 bg-white text-black/70"
              }`}
            >
              {content.topBadge}
            </p>

            <div className="max-w-4xl">
              <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {content.heroTitle}{" "}
                <span
                  className={
                    isDark ? "font-bold text-white" : "font-bold text-[#111827]"
                  }
                >
                  {content.heroTitleAccent}
                </span>
              </h2>

              <div className="mt-3 flex items-center">
                <p
                  className={`text-3xl font-semibold italic leading-tight md:text-5xl ${
                    isDark ? "text-[#4f7cff]" : "text-[#2563eb]"
                  }`}
                >
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>

              <p
                className={`mt-8 max-w-2xl text-base leading-7 md:text-lg ${
                  isDark ? "text-white/75" : "text-black/70"
                }`}
              >
                {content.heroDescription}
              </p>

              <p
                className={`mt-6 max-w-2xl text-sm leading-7 md:text-base ${
                  isDark ? "text-white/55" : "text-black/55"
                }`}
              >
                {content.heroExtraText}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className={`rounded-2xl px-6 py-3 font-medium transition ${
                  isDark
                    ? "bg-white text-black hover:opacity-90"
                    : "bg-[#111827] text-white hover:opacity-90"
                }`}
              >
                {content.viewProjects}
              </a>
              <a
                href="#contact"
                className={`rounded-2xl border px-6 py-3 font-medium transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-black/10 text-black hover:bg-black/5"
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
                className={`aspect-[4/5] w-full overflow-hidden rounded-2xl ${
                  isDark ? "bg-white/10" : "bg-[#e5e7eb]"
                }`}
              >
                <img
                  src="/profile.jpg"
                  alt="Facundo Sanchez"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-24 scroll-mt-24">
          <div className="max-w-3xl">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                isDark ? "text-white/50" : "text-black/45"
              }`}
            >
              {content.aboutLabel}
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight">
              {content.aboutTitle}
            </h3>
            <p
              className={`mt-6 text-base leading-8 ${
                isDark ? "text-white/75" : "text-black/70"
              }`}
            >
              {content.aboutText}
            </p>
          </div>
        </section>

        <section id="skills" className="mt-24 scroll-mt-24">
          <p
            className={`text-center text-sm font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-white/50" : "text-black/45"
            }`}
          >
            {content.skillsLabel}
          </p>
          <h3 className="mt-3 text-center text-3xl font-bold tracking-tight">
            {content.skillsTitle}
          </h3>

          <div className="mt-10 space-y-5">
            <SkillRow items={skillsRow1} isDark={isDark} />
            <SkillRow items={skillsRow2} reverse isDark={isDark} />
            <SkillRow items={skillsRow3} isDark={isDark} />
          </div>
        </section>

        <section id="experience" className="mt-24 scroll-mt-24">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
              isDark ? "text-white/50" : "text-black/45"
            }`}
          >
            {content.experienceLabel}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight">
            {content.experienceTitle}
          </h3>

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
              <h4 className="mt-2 text-xl font-semibold">
                {content.experienceRole}
              </h4>
              <p className={isDark ? "mt-2 text-sm text-white/60" : "mt-2 text-sm text-black/55"}>
                {content.experienceDate}
              </p>

              <ul className={isDark ? "mt-5 space-y-3 text-white/75" : "mt-5 space-y-3 text-black/70"}>
                {content.experienceItems.map((item) => (
                  <li key={item}>• {item}</li>
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
              <h4 className="mt-2 text-xl font-semibold">
                {content.educationTitle}
              </h4>
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

        <section id="projects" className="mt-24 scroll-mt-24">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
              isDark ? "text-white/50" : "text-black/45"
            }`}
          >
            {content.projectsLabel}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight">
            {content.projectsTitle}
          </h3>
          <p className={isDark ? "mt-4 max-w-2xl text-white/70" : "mt-4 max-w-2xl text-black/65"}>
            {content.projectsDescription}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className={`rounded-3xl border p-6 transition hover:-translate-y-1 ${
                  isDark
                    ? "border-white/10 bg-white/5 hover:bg-white/[0.07]"
                    : "border-black/10 bg-white hover:bg-[#f9fafb]"
                }`}
              >
                <p className={isDark ? "text-sm text-white/50" : "text-sm text-black/50"}>
                  {project.status}
                </p>
                <h4 className="mt-2 text-xl font-semibold">{project.title}</h4>
                <p className={isDark ? "mt-4 text-sm leading-7 text-white/75" : "mt-4 text-sm leading-7 text-black/70"}>
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        isDark
                          ? "border-white/10 bg-white/10 text-white/80"
                          : "border-black/10 bg-[#f3f4f6] text-black/75"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-24 scroll-mt-24 pb-10">
          <div
            className={`rounded-[2rem] border p-8 md:p-10 ${
              isDark
                ? "border-white/10 bg-gradient-to-br from-white/10 to-white/5"
                : "border-black/10 bg-gradient-to-br from-white to-[#eef2f7]"
            }`}
          >
            <p
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                isDark ? "text-white/50" : "text-black/45"
              }`}
            >
              {content.contactLabel}
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight">
              {content.contactTitle}
            </h3>
            <p className={isDark ? "mt-4 max-w-2xl text-white/75" : "mt-4 max-w-2xl text-black/70"}>
              {content.contactDescription}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <a
                href="mailto:facundosanchez0318@gmail.com"
                className={`rounded-2xl border p-5 transition ${
                  isDark
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-black/10 bg-white hover:bg-[#f9fafb]"
                }`}
              >
                <p className={isDark ? "text-sm text-white/50" : "text-sm text-black/50"}>
                  {content.email}
                </p>
                <p className="mt-1 font-medium">facundosanchez0318@gmail.com</p>
              </a>

              <a
                href="https://github.com/facu526"
                target="_blank"
                rel="noreferrer"
                className={`rounded-2xl border p-5 transition ${
                  isDark
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-black/10 bg-white hover:bg-[#f9fafb]"
                }`}
              >
                <p className={isDark ? "text-sm text-white/50" : "text-sm text-black/50"}>
                  {content.github}
                </p>
                <p className="mt-1 font-medium">github.com/facu526</p>
              </a>

              <a
                href="https://linkedin.com/in/facundo-sanchez-03a219360"
                target="_blank"
                rel="noreferrer"
                className={`rounded-2xl border p-5 transition ${
                  isDark
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-black/10 bg-white hover:bg-[#f9fafb]"
                }`}
              >
                <p className={isDark ? "text-sm text-white/50" : "text-sm text-black/50"}>
                  {content.linkedin}
                </p>
                <p className="mt-1 font-medium">
                  linkedin.com/in/facundo-sanchez-03a219360
                </p>
              </a>

              <div
                className={`rounded-2xl border p-5 ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-black/10 bg-white"
                }`}
              >
                <p className={isDark ? "text-sm text-white/50" : "text-sm text-black/50"}>
                  {content.phone}
                </p>
                <p className="mt-1 font-medium">+54 11 2668-4038</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}