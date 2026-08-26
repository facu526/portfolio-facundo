"use client";

import { useState } from "react";
import type { ServiceInquiryPrefill } from "../lib/service-inquiry";
import ContactSection from "./contact-section";
import ServicesSection from "./services-section";

type ServicesContactFlowProps = {
  language: "es" | "en";
  isDark: boolean;
};

export default function ServicesContactFlow({
  language,
  isDark,
}: ServicesContactFlowProps) {
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");

  function handleServiceInquiry(inquiry: ServiceInquiryPrefill) {
    setProjectType(inquiry.projectType);
    setMessage(inquiry.message);

    window.requestAnimationFrame(() => {
      const contactSection = document.getElementById("contact");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      contactSection?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      <ServicesSection
        language={language}
        isDark={isDark}
        onSelectService={handleServiceInquiry}
      />
      <ContactSection
        language={language}
        isDark={isDark}
        projectType={projectType}
        message={message}
        onProjectTypeChange={setProjectType}
        onMessageChange={setMessage}
      />
    </>
  );
}
