"use client";

import { useState } from "react";
import type { PackageInquiryPrefill } from "../lib/package-inquiry";
import ContactSection from "./contact-section";
import ServicesPricingSection from "./services-pricing-section";

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

  function handlePackageInquiry(inquiry: PackageInquiryPrefill) {
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
      <ServicesPricingSection
        language={language}
        isDark={isDark}
        onSelectPlan={handlePackageInquiry}
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
