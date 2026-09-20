import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "CE/JM Tutoring — Chemistry & IM3 at Beaumont High";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070c",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", color: "#f4f4f9", fontSize: 28, letterSpacing: 6 }}>
          {site.school.toUpperCase()} &middot; PEER TUTORING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 76, fontWeight: 600 }}>
            Chemistry & IM3
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              color: "#f4f4f9",
              fontSize: 30,
              fontFamily: "Helvetica, Arial, sans-serif",
              opacity: 0.75,
            }}
          >
            CE/JM Tutoring — Caden Erwin & Jayden McCarthy
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 140,
            height: 10,
            background: "#241b79",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
