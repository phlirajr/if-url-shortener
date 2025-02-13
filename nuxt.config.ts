// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {    
    plugins: [      
      tailwindcss(),    
    ],
    },
  supabase:{
    redirect: false,

  },
  runtimeConfig: {
    public: {
      appURL: process.env.APP_URL,
    },
  },
  modules: ["@nuxtjs/supabase"],
});