module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        countdoown: {
          'from': {'stroke-dashoffset': '0px'},
          'to': {'stroke-dashoffset': '113px'},
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ],
}
