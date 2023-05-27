// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  publicRuntimeConfig:{
    base:process.env.NODE_ENV == "production" ? "/Replay-Toolbox/": "/"
  },
  app: {
    baseURL: process.env.NODE_ENV =="production" ? "/Replay-Toolbox": "/",
    buildAssetsDir: "/nuxt/",
    cdnURL:"/Replay-Toolbox"
  },
  router:{
    base:process.env.NODE_ENV =="production" ? "/Replay-Toolbox/": "/"
  }
})
