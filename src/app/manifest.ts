import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Álvaro Lostal | Creative Developer",
    short_name: "Álvaro Lostal",
    description: "Ingeniero Informático especializado en Desarrollo Web Frontend.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/favicons/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicons/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
