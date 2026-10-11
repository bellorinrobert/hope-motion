import { siteConfig } from "@/lib/site-config";

export function buildWhatsAppUrl(rawNumber: string, message: string): string {
  const digits = rawNumber.replace(/\D/g, "");
  const query = new URLSearchParams({ text: message });
  return `https://wa.me/${digits}?${query.toString()}`;
}

export function campaignWhatsAppUrl(message: string = siteConfig.shareMessage): string {
  return buildWhatsAppUrl(siteConfig.contactWhatsapp, message);
}

export async function shareCampaign(): Promise<"shared" | "copied" | "failed"> {
  const payload = {
    title: siteConfig.tagline,
    text: siteConfig.shareMessage,
    url: siteConfig.gofundmeUrl,
  };

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(payload);
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "failed";
      }
    }
  }

  try {
    await navigator.clipboard.writeText(`${payload.text} ${payload.url}`);
    return "copied";
  } catch {
    return "failed";
  }
}
