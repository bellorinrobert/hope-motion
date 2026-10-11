import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#16110d",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(217,164,65,0.45), transparent 55%), radial-gradient(circle at 12% 88%, rgba(192,90,56,0.5), transparent 55%)",
          color: "#f8f2e9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d9a441",
          }}
        >
          <span>Hope Motion</span>
          <span>Campaña oficial</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              maxWidth: 980,
              display: "flex",
              flexDirection: "column",
            }}
          >
            Ayudemos a Andrea a volver a caminar
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: "rgba(248,242,233,0.72)",
              maxWidth: 860,
              display: "flex",
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "rgba(248,242,233,0.75)",
          }}
        >
          <span
            style={{
              padding: "14px 34px",
              borderRadius: 999,
              backgroundColor: "#c05a38",
              color: "#ffffff",
              display: "flex",
            }}
          >
            gofundme.com
          </span>
          <span>gofundme.com/f/ayuda-a-andrea</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
