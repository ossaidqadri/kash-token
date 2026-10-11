// @ts-check

import { realpathSync } from "node:fs"
import { dirname, sep } from "node:path"
import { fileURLToPath } from "node:url"

import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { searchForWorkspaceRoot } from "vite"

// Where installed packages physically live. With bun's global store on, that is the
// shared cache (e.g. D:/.bun-cache/links), outside this project, and Vite refuses to
// serve files from it (@astrojs/react client.js, fontsource woff2). Derived from a
// package's real path rather than written down, so it follows each machine's cache dir;
// with the global store off it lands inside node_modules, which is allowed anyway.
const reactFile = realpathSync(fileURLToPath(import.meta.resolve("@astrojs/react")))
const packageStore = dirname(reactFile.slice(0, reactFile.lastIndexOf(`${sep}node_modules${sep}`)))

// https://astro.build/config
export default defineConfig({
  site: "https://www.kashtoken.com",
  redirects: { "/home": "/" },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Setting allow replaces Vite's default, so the workspace root goes back in.
      fs: { allow: [searchForWorkspaceRoot(process.cwd()), packageStore] },
    },
  },
  integrations: [mdx(), react(), sitemap()],
})
