"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

type Language = "es" | "en";
type ModalMode = "video" | "gallery" | null;

const BASE = "/projects/fixenra";

const screenshots = [
  {
    src: `${BASE}/home.webp`,
    alt: {
      es: "Pantalla principal de Fixenra",
      en: "Fixenra home screen",
    },
    caption: { es: "Inicio", en: "Home" },
  },
  {
    src: `${BASE}/orders.webp`,
    alt: {
      es: "Gestión de órdenes en Fixenra",
      en: "Work order management in Fixenra",
    },
    caption: { es: "Mis órdenes", en: "My orders" },
  },
  {
    src: `${BASE}/intervention.webp`,
    alt: {
      es: "Registro de intervención en Fixenra",
      en: "Intervention log in Fixenra",
    },
    caption: { es: "Intervención", en: "Intervention" },
  },
  {
    src: `${BASE}/completed.webp`,
    alt: {
      es: "Orden completada en Fixenra",
      en: "Completed work order in Fixenra",
    },
    caption: { es: "Orden completada", en: "Completed order" },
  },
  {
    src: `${BASE}/asset.webp`,
    alt: {
      es: "Ficha de activo en Fixenra",
      en: "Asset details in Fixenra",
    },
    caption: { es: "Activo", en: "Asset" },
  },
  {
    src: `${BASE}/history.webp`,
    alt: {
      es: "Historial de un activo en Fixenra",
      en: "Asset history in Fixenra",
    },
    caption: { es: "Historial", en: "History" },
  },
];

const technologies = ["React Native", "Expo", "TypeScript", "Zustand"];

const copy = {
  es: {
    badge: "Aplicación móvil",
    subtitle: "Gestión de mantenimiento en campo",
    description:
      "Aplicación móvil para gestión de mantenimiento y operaciones de campo. Permite a técnicos visualizar órdenes de trabajo, registrar intervenciones, consultar activos e historiales y reportar problemas desde el celular.",
    features: [
      "Órdenes de trabajo e intervenciones",
      "Activos e historial",
      "Reporte de incidencias",
      "Persistencia local",
    ],
    demo: "Ver demo",
    gallery: "Ver capturas",
    coverAlt: "Portada de Fixenra: aplicación móvil de mantenimiento en campo",
    close: "Cerrar",
    prev: "Captura anterior",
    next: "Captura siguiente",
    videoLabel: "Video demo de Fixenra",
    galleryLabel: "Capturas de Fixenra",
  },
  en: {
    badge: "Mobile app",
    subtitle: "Field maintenance management",
    description:
      "Mobile app for maintenance and field operations management. It lets technicians view work orders, log interventions, check assets and their history, and report issues from their phone.",
    features: [
      "Work orders and interventions",
      "Assets and history",
      "Issue reporting",
      "Local persistence",
    ],
    demo: "Watch demo",
    gallery: "View screenshots",
    coverAlt: "Fixenra cover: mobile app for field maintenance",
    close: "Close",
    prev: "Previous screenshot",
    next: "Next screenshot",
    videoLabel: "Fixenra demo video",
    galleryLabel: "Fixenra screenshots",
  },
};

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function ImagesIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m21 16-5-5-8 8" />
    </svg>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={direction === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

const modalButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]";

type ModalProps = {
  mode: Exclude<ModalMode, null>;
  language: Language;
  onClose: () => void;
};

function FixenraModal({ mode, language, onClose }: ModalProps) {
  const t = copy[language];
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((step: number) => {
    setIndex((current) => (current + step + screenshots.length) % screenshots.length);
  }, []);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (mode === "gallery" && event.key === "ArrowLeft") {
        go(-1);
      } else if (mode === "gallery" && event.key === "ArrowRight") {
        go(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [mode, onClose, go]);

  const current = screenshots[index];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={mode === "video" ? t.videoLabel : t.galleryLabel}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.close}
        className={`${modalButton} absolute right-4 top-4 z-10`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {mode === "video" ? (
        <video
          src={`${BASE}/fixenra-demo.mp4`}
          controls
          playsInline
          preload="metadata"
          aria-label={t.videoLabel}
          onClick={(event) => event.stopPropagation()}
          className="max-h-[calc(100dvh-6rem)] max-w-full rounded-2xl bg-black shadow-2xl"
        />
      ) : (
        <div
          className="flex w-full max-w-md flex-col items-center gap-4"
          onClick={(event) => event.stopPropagation()}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
          }}
        >
          <div
            className="relative aspect-[9/20] overflow-hidden rounded-2xl bg-[#0b0f19] shadow-2xl"
            style={{ height: "min(calc(100dvh - 11rem), 640px)" }}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt[language]}
              fill
              sizes="(max-width: 767px) 80vw, 300px"
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label={t.prev} className={modalButton}>
              <Chevron direction="left" />
            </button>
            <p className="min-w-[8.5rem] text-center text-sm text-white/80" aria-live="polite">
              {current.caption[language]}
              <span className="ml-2 text-white/45">
                {index + 1}/{screenshots.length}
              </span>
            </p>
            <button type="button" onClick={() => go(1)} aria-label={t.next} className={modalButton}>
              <Chevron direction="right" />
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}

type FixenraCardProps = {
  index: number;
  language: Language;
  isDark: boolean;
  isVisible: boolean;
};

export default function FixenraCard({
  index,
  language,
  isDark,
  isVisible,
}: FixenraCardProps) {
  const t = copy[language];
  const [mode, setMode] = useState<ModalMode>(null);
  const closeModal = useCallback(() => setMode(null), []);

  const actionBase =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]";

  return (
    <article
      className={`projects-reveal relative min-w-0 md:col-span-12 ${
        isVisible ? "is-visible" : ""
      }`}
      style={{ "--reveal-delay": `${120 + index * 85}ms` } as CSSProperties}
    >
      <div
        className={`overflow-hidden rounded-[16px] ring-1 ${
          isDark ? "bg-[#111827] ring-white/[0.07]" : "bg-[#dfe5ef] ring-black/[0.08]"
        }`}
      >
        <div className="relative aspect-video w-full bg-[#0b111a]">
          <Image
            src={`${BASE}/cover.webp`}
            alt={t.coverAlt}
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), 1140px"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 z-10 text-[11px] font-semibold tracking-[0.24em] text-white/75 sm:left-5 sm:top-5">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.75rem]">
                Fixenra
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200 sm:text-[11px]">
                <PhoneIcon />
                {t.badge}
              </span>
            </div>
            <p className="mt-1 text-base font-medium text-white/90">{t.subtitle}</p>
            <p className="mt-3 text-sm leading-6 text-white/70">{t.description}</p>

            <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-sm text-white/75 sm:grid-cols-2">
              {t.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/80" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-[11px]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <button
              type="button"
              onClick={() => setMode("video")}
              className={`${actionBase} bg-white text-black hover:opacity-90`}
            >
              <PlayIcon />
              {t.demo}
            </button>
            <button
              type="button"
              onClick={() => setMode("gallery")}
              className={`${actionBase} border border-white/20 text-white hover:bg-white/10`}
            >
              <ImagesIcon />
              {t.gallery}
            </button>
          </div>
        </div>
      </div>

      {mode ? <FixenraModal mode={mode} language={language} onClose={closeModal} /> : null}
    </article>
  );
}
