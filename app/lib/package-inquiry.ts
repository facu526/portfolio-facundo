export type PackageInquiryPrefill = {
  projectType: "Landing Page" | "Web Institucional" | "Tienda Online";
  message: string;
};

export const PACKAGE_INQUIRIES = {
  landingPage: {
    projectType: "Landing Page",
    message:
      "Hola Facundo, estuve viendo el paquete de Landing Page desde $300.000 ARS y me gustaría recibir más información.",
  },
  institutionalWebsite: {
    projectType: "Web Institucional",
    message:
      "Hola Facundo, estuve viendo el paquete de Web Institucional desde $450.000 ARS y me gustaría recibir más información.",
  },
  onlineStore: {
    projectType: "Tienda Online",
    message:
      "Hola Facundo, estuve viendo el paquete de Tienda Online desde $700.000 ARS y me gustaría recibir más información.",
  },
} as const satisfies Record<string, PackageInquiryPrefill>;
