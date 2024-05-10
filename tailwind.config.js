/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./js/**/*.{html,js}",
    './home.html',
    './arribos.html',
    './servicios.html',
    './acerca-de-nosotros.html',
    './archivos-de-interes.html',
    './carga-aerea.html',
    './carga-maritima.html',
    './carga-terrestre.html',
    './contacto.html',
    './deposito-fiscal.html',
    './faqs.html',
    './puertos.html',
    "./node_modules/flowbite/**/*.js",
    'node_modules/preline/dist/*.js',
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'clrAzul': '#184678',
        'clrCeleste': '#41b6e6',
        'clrGrisClaro': '#d9dadb',
        'clrGrisOscuro': '#383838',
        'bgDropdown':'#1c273c',
        'clrEsperado': '#43b5e4',
        'clrCancelado': '#e63f41',
        'clrFinalizado': '#69b79d',
        'clrOperando': '#fce76f',
      },
      fontSize:{
        'xxs': '.50rem',
      },
      spacing:{
        'h-100': '400px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    require('preline/plugin'),
    require("tw-elements/plugin.cjs"),
  ],
}

