import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "36px",
            background: "linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          <span style={{ fontSize: "48px", lineHeight: 1 }}>🏥</span>
          <span
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "900",
              letterSpacing: "-0.5px",
              fontFamily: "sans-serif",
              lineHeight: 1,
            }}
          >
            木更津
          </span>
        </div>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
