export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  gofundmeUrl: string;
  contactWhatsapp: string;
  shareMessage: string;
}

const gofundmeUrl =
  process.env.NEXT_PUBLIC_GOFUNDME_URL ??
  "https://www.gofundme.com/f/ayuda-a-andrea-a-volver-a-caminar-sin-muletas";

export const siteConfig: SiteConfig = {
  name: "Hope Motion",
  tagline: "Ayudemos a Andrea a volver a caminar",
  description:
    "Campaña de recaudación para acompañar a Andrea en su recuperación y en el camino de volver a caminar sin muletas. Conoce su historia y aporta hoy.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  gofundmeUrl,
  contactWhatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "",
  shareMessage: `Acompaña a Andrea a volver a caminar sin muletas. Conoce la campaña y aporta: ${gofundmeUrl}`,
};
