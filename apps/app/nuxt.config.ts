import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: "bun",
    routeRules: {
      "/api/**": {
        proxy: `${process.env.NUXT_PUBLIC_API_URL}/**`,
      },
    },
  },
  css: ["~/assets/app.css"],
  ssr: false,
})
