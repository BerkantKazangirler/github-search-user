/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: 'selector',
  theme: {
    extend: {
      spacing: {
        '100': '31rem',
        '128': '32rem',
        '256': '44rem',
      },
      colors: {
        'netural-dark-blue':'#202632',
        'netural-blue':'#343c4c',
      },
      boxShadow: {
        full: "0px 0px 32px 0px rgba(82,255,168,0.75);",
      }
    },
    container: {
      screens: {
        sm: '400px',
        md: '600px',
        lg: '728px',
        xl: '984px',
        '2xl': '1240px',
      },
    }
  },
  plugins: [],
}

