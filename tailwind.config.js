module.exports = {
  content: ['./src/**/*.{svelte,css,html,js,ts}'],
  theme: {
    extend: {
    	colors: {
    	    myColor: '#500546',
        }
    },
    screens: {
        ss: '320px',
        ssm: '400px',
        xs: '480px',
        xsm: '560px',
        sm: '640px',
        smm: '704px',
        md: '768px',
        mdm: '896px',
        lg: '1024px',
        lgm: '1152px',
        xl: '1280px',
    }
  },
  plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/typography'),
  ],
}
