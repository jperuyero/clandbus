module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  prefix: 'tw-',
  important: true,
  theme: {
    extend: {
      brightness: {
        25: '.25',
      },
      height: {
        '80-vh': '80vh',
      },
      minHeight: {
        '80-vh': '80vh',
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['hover', 'focus'],
      transitionProperty: ['hover', 'focus'],
      transitionDuration: ['hover', 'focus'],
      transitionTimingFunction: ['hover', 'focus', 'first'],
      height: ['hover', 'focus'],
    },
  },
  plugins: [],
}
