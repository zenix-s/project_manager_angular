/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        chalky: {
          DEFAULT: '#e5c07b',
          '50': '#fcf9f0',
          '100': '#f8f0dc',
          '200': '#f1deb7',
          '300': '#e5c07b',
          '400': '#dda75a',
          '500': '#d68f39',
          '600': '#c8792e',
          '700': '#a65f28',
          '800': '#854c27',
          '900': '#6c3f22',
          '950': '#3a1f10',
        },
        coral: {
          DEFAULT: '#e55560',
          '50': '#fdf3f3',
          '100': '#fce4e5',
          '200': '#fbcdcf',
          '300': '#f7aaad',
          '400': '#ef696f',
          '500': '#e64d54',
          '600': '#d23037',
          '700': '#b0252b',
          '800': '#922227',
          '900': '#7a2226',
          '950': '#420d0f',
        },
        dark: {
          DEFAULT: '#1f2329',
        },
        error: {
          DEFAULT: '#f44747',
        },
        fountainBlue: {
          DEFAULT: '#2bbac5',
        },
        green: {
          DEFAULT: '#89ca78',
        },
        invalid: {
          DEFAULT: '#ffffff',
        },
        lightDark: {
          DEFAULT: '#7f848e',
        },
        lightWhite: {
          DEFAULT: '#abb2bf',
        },
        malibu: {
          DEFAULT: '61afef'
        },
        purple: {
          DEFAULT: '#d55fde',
        },
        whiskey: {
          DEFAULT: '#d19a66'
        },
        deepRed: {
          DEFAULT: '#BE5046'
        },
        white: {
          DEFAULT: '#ffffff',
        }
      }
    },

  },
  plugins: [],
}

