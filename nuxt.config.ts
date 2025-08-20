// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@pinia/nuxt',
        'reka-ui/nuxt',
    ],

    routeRules: {
        '/': { redirect: '/apartments/' }
    },

    typescript: {
        strict: false
    },

    css: [
        './public/fonts/PT-Root-UI/PT-Root-UI_VF.css'
  ],

})