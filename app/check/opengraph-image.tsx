import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Share card for /check (WhatsApp, LinkedIn, X previews).
export const alt = "Does your website sound like ChatGPT? Free AI copy checker by FlyHi Social";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const black = readFile(join(process.cwd(), "assets/fonts/Archivo-Black.ttf"));
const semibold = readFile(join(process.cwd(), "assets/fonts/Archivo-SemiBold.ttf"));

export default async function Image() {
  const cell = (bg: string) => <div style={{ width: 22, height: 22, background: bg }} />;
  const gap = <div style={{ width: 22, height: 22 }} />;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#000", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", fontFamily: "Archivo" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", gap: 4 }}>{gap}{gap}{cell("#EC3013")}</div>
            <div style={{ display: "flex", gap: 4 }}>{gap}{cell("#fff")}{cell("#fff")}</div>
            <div style={{ display: "flex", gap: 4 }}>{cell("#fff")}{cell("#fff")}{gap}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}>FLYHI</div>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: 9 }}>SOCIAL</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.98, letterSpacing: -3 }}>Does your website</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 0.98, letterSpacing: -3 }}>
            sound like&nbsp;<span style={{ color: "#EC3013" }}>ChatGPT?</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, fontWeight: 600, color: "#cfcfcf" }}>
          <div>Free AI copy checker. Score out of 100 in ten seconds.</div>
          <div style={{ color: "#fff" }}>flyhisocial.com/check</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: await black, style: "normal", weight: 900 },
        { name: "Archivo", data: await semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
