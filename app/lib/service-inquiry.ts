export type Language = "es" | "en";

export type ServiceInquiryPrefill = {
  projectType: "Landing Page" | "Web Institucional" | "Tienda Online";
  message: string;
};

type ServiceInquiry = {
  projectType: ServiceInquiryPrefill["projectType"];
  message: Record<Language, string>;
};

export const SERVICE_INQUIRIES = {
  landingPage: {
    projectType: "Landing Page",
    message: {
      es: "Hola Facundo, me gustaría conversar sobre un proyecto de Landing Page y recibir más información.",
      en: "Hi Facundo, I'd like to discuss a Landing Page project and receive more information.",
    },
  },
  institutionalWebsite: {
    projectType: "Web Institucional",
    message: {
      es: "Hola Facundo, me gustaría conversar sobre un proyecto de Web Institucional y recibir más información.",
      en: "Hi Facundo, I'd like to discuss a Business Website project and receive more information.",
    },
  },
  onlineStore: {
    projectType: "Tienda Online",
    message: {
      es: "Hola Facundo, me gustaría conversar sobre un proyecto de Tienda Online y recibir más información.",
      en: "Hi Facundo, I'd like to discuss an Online Store project and receive more information.",
    },
  },
} as const satisfies Record<string, ServiceInquiry>;
