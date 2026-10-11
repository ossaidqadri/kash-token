// @ts-check

import mdx from "@astrojs/mdx"
import partytown from "@astrojs/partytown"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://www.kashtoken.com",
  redirects: { "/home": "/" },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), react(), partytown(), sitemap()],
})
