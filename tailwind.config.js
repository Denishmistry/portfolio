/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './*.html',
    './custom.js',
  ],
  theme: {
    extend: {
      // keyframes: {
      //   marquee: {
      //     '0%': {transform: 'translateX(0)'},
      //     '100%': {transform: 'translateX(-100%)' },
      //   }
      // },
      // spacing: {
      //   '50':"50px",
      //   '85': '85px',
      //   '100': '100px',

      // },
      keyframes: {
        anim: {

          '0%': {top: '-80px'},
          '100%': {transform: '0' },
        }
      },
      fontFamily: {
        'sans': ["Lato", 'sans-serif',...defaultTheme.fontFamily.sans],
        'playfair': ["Playfair Display", 'serif'],
      },
      colors: {
        'white':'#D5CDC4',
        'light-black': '#000',

      },
      container: {
        center: true,
        screens: {
          xl: '1600px',
          lg: '1024px',
          md: '768px',
          sm: '640px',
        },
        padding: {
          xl: '15px',
          xlg: '15px',
          lg: '15px',
          md: '15px',
          sm: '15px',
          DEFAULT: '1rem',
        },
        'xlg': '1520px',
      },

      // fontSize: {

      //   '120': ['120px', {lineHeight: '1.4'}],
      //   '80': ['80px', {lineHeight: '1.4'}],
      //   '40': ['40px', {lineHeight: '1.4'}],
      //   '30': ['30px', {lineHeight: '1.4'}],
      //   '14': ['14px', {lineHeight: '1.4'}],
      //   '16': ['16px', {lineHeight: '1.4'}],
      //   '20': ['20px', {lineHeight: '1.4'}],
      //   '24': ['24px', {lineHeight: '1.4'}],
      //   '32': ['32px', {lineHeight: '1.4'}],
      // },
      lineHeight: {
        'lh1': '1.15',
        'lh16': '1.6',

      }

    },
  },
  plugins: [],
}

