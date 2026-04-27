import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rubayet Hassan — Product engineer & builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#030305",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        {/* Purple accent block */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "#7c3aed",
          }}
        />

        {/* Monogram */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 80,
            width: 72,
            height: 72,
            border: "1px solid #27272f",
            borderRadius: "10px",
            background: "#121218",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f4f4f8",
            fontSize: 22,
            fontFamily: "monospace",
            letterSpacing: "0.02em",
          }}
        >
          RH
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#f4f4f8",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 20,
            fontFamily: "sans-serif",
          }}
        >
          Rubayet Hassan
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "#8b8b9a",
            fontFamily: "monospace",
            letterSpacing: "0.01em",
          }}
        >
          product engineer · AI builder · dhaka
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 18,
            color: "#4c1d95",
            fontFamily: "monospace",
          }}
        >
          rubayethassan.com
        </div>
      </div>
    ),
    { ...size }
  );
}
