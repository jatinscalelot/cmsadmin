/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xsm': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '2k': '1920px',
      '4k': '2560px',
    },
    fontFamily: {
      primary: [' "Kumbh Sans" ', 'sans-serif'],
      second: [' Poppins ', 'sans-serif']

    },
    extend: {
      fontSize: {
        '10': ['0.625rem', '0.75rem'],
        '40': ['2.5rem', '.9'],
      },
      colors: {
        brightGray: '#eee',
        yankeesBlue: '#1E293B',
        lightGreen: '#C8EE44',
        azureishWhite: '#E2E8F0',
        darkGreen: '#8FB50B',
        lightGray: '#94A3B8',
        lightWhite: '#F8FAFC',
      },
      boxShadow: {
        'shadow': '0px 0px 10px rgba(0, 0, 0, 0.09)',
        'shadowbox': ' -3px -1px 17px rgba(208, 210, 218, 0.83)'
      },
      dropShadow: {
        'vshadow': '0px 5px 13px rgba(203, 213, 225, 0.59)'
      },
    },
  },
  plugins: [],
}
