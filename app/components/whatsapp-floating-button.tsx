import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "../lib/contact";
import { WhatsAppIcon } from "./icons";

type WhatsAppFloatingButtonProps = {
  language: "es" | "en";
  isDark: boolean;
};

export default function WhatsAppFloatingButton({
  language,
  isDark,
}: WhatsAppFloatingButtonProps) {
  return (
    <a
      href={createWhatsAppUrl(WHATSAPP_MESSAGES.floatingButton)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        language === "es"
          ? "Consultar por WhatsApp (se abre en una nueva pestaña)"
          : "Contact me on WhatsApp (opens in a new tab)"
      }
      className={`whatsapp-floating fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_12px_34px_rgba(0,0,0,0.28)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16 ${
        isDark
          ? "border-white/15 bg-[#4f7cff] text-white focus-visible:ring-offset-[#0b0f19]"
          : "border-[#1d4ed8]/20 bg-[#2563eb] text-white focus-visible:ring-offset-[#f5f7fb]"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
