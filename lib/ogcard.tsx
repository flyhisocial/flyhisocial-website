import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Shared 1200x630 share card (WhatsApp, LinkedIn, X previews) in the FlyHi brand. */
export const ogSize = { width: 1200, height: 630 };

const black = readFile(join(process.cwd(), "assets/fonts/Archivo-Black.ttf"));
const semibold = readFile(join(process.cwd(), "assets/fonts/Archivo-SemiBold.ttf"));

export async function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const cell = (bg: string) => <div style={{ width: 22, height: 22, background: bg }} />;
  const gap = <div style={{ width: 22, height: 22 }} />;
  const size = title.length > 46 ? 70 : title.length > 30 ? 82 : 96;
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
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 600, color: "#EC3013", letterSpacing: 4, textTransform: "uppercase" }}>
            <div style={{ width: 14, height: 14, background: "#EC3013" }} />{eyebrow}
          </div>
          <div style={{ fontSize: size, fontWeight: 900, lineHeight: 1, letterSpacing: -2.5, maxWidth: 1050 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 600, color: "#cfcfcf" }}>
          <div>{footer}</div>
          <div style={{ color: "#fff" }}>flyhisocial.com</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: await black, style: "normal", weight: 900 },
        { name: "Archivo", data: await semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
