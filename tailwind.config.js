/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // 'mob' : { 'min' : '360px' , 'max': '479px' },
      // 'xsm' : { 'min' : '480px' , 'max': '639px' },
      // 'sm'  : {'min': '640px', 'max': '767px'},
      // 'md'  : {'min': '768px', 'max': '1023px'},
      // 'lg'  : {'min': '1024px', 'max': '1279px'},
      // 'xl'  : {'min': '1280px', 'max': '1535px'},
      // '2xl' : {'min': '1536px'},
      'mob' : '360px',
      'xsm' : '480px',
      'sm' : '640px',
      'md' : '768px',
      'lg' : '1024px',
      'xl' : '1280px'
    },
    extend: {},
  },
  plugins: [],
}

