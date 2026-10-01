import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt =
  "Rubayet Hassan — AI Software Engineer building StorageAtlas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage() {
  const [font, latinFont] = await Promise.all([
    readFile(path.join(process.cwd(), "src/assets/fonts/Creation.ttf")),
    readFile(path.join(process.cwd(), "src/assets/fonts/Geist-OG.ttf")),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0D0F10",
        color: "#F2EEE7",
        padding: "60px 72px",
        fontFamily: "Geist",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: "-1px",
          color: "#DCA77C",
        }}
      >
        RH /
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 50,
          fontSize: 18,
          color: "#DCA77C",
          letterSpacing: "3px",
        }}
      >
        AI SOFTWARE ENGINEER
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 22,
          fontSize: 84,
          lineHeight: 1.05,
          letterSpacing: "-5px",
        }}
      >
        <span>Rubayet</span>
        <span>
          Hassan<span style={{ color: "#DCA77C" }}>.</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 30,
          fontSize: 26,
          color: "#A5A09A",
        }}
      >
        Less busywork. More business.
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 175,
          right: 68,
          fontFamily: "Creation",
          fontWeight: 700,
          fontSize: 190,
          letterSpacing: "-12px",
        }}
      >
        <span>創</span>
        <span style={{ color: "#DCA77C" }}>造</span>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 445,
          right: 85,
          fontSize: 16,
          color: "#A5A09A",
          letterSpacing: "2px",
        }}
      >
        SŌZŌ / CREATION
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 42,
          left: 72,
          fontSize: 16,
          color: "#A5A09A",
        }}
      >
        Building StorageAtlas / Dhaka, Bangladesh
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: latinFont, weight: 400, style: "normal" },
        { name: "Creation", data: font, weight: 700, style: "normal" },
      ],
    },
  );
}
