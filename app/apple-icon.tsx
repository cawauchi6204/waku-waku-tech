import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

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
          background: "radial-gradient(50% 50% at 50% 50%, rgba(255,90,31,0.45), #000 75%)",
        }}
      >
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: 999,
            background: "linear-gradient(135deg, #ffd29a 0%, #ff8a3d 40%, #ff5a1f 65%, #ff2d6f 100%)",
          }}
        />
      </div>
    ),
    size
  )
}
