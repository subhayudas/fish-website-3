import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Poissonnerie Sherbrooke", short_name: "Poissonnerie", description: "Fresh fish, seafood and prepared foods in Montréal.", start_url: "/en", display: "standalone", background_color: "#031923", theme_color: "#031923", icons: [{ src: "/fish/logo.png", sizes: "44x46", type: "image/png" }] };
}
