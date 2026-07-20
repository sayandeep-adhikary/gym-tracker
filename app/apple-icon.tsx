import { ImageResponse } from "next/og";

/** iOS home-screen icon (Apple touch icon). Generated as a PNG at build time. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        }}
      >
        {/* A simple, bold dumbbell built from rounded rectangles. */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 26, height: 86, borderRadius: 13, background: "#fff" }} />
          <div style={{ width: 16, height: 58, borderRadius: 8, background: "#fff" }} />
          <div style={{ width: 60, height: 20, background: "#fff" }} />
          <div style={{ width: 16, height: 58, borderRadius: 8, background: "#fff" }} />
          <div style={{ width: 26, height: 86, borderRadius: 13, background: "#fff" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
