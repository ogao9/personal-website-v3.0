const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'maize' : '#FFC700',
				'nightly' : '#586079',
				'trappedDarkness' :'#0A1D2F',
				'awesomeViolet' : '#a8b2d1',
			},
			animation: {
				toast: 'fadeIn 8s forwards',
			  },
			keyframes: {
				'fadeIn': {
				  '0%': {opacity: '0'},
				  '30%': {opacity: '1'},
				  '70%': {opacity: '1'},
				  '100%': {opacity: '0'},
				},
			},
			typography: (theme) => ({
				dark: {
				  css: {
					color: '#a8b2d1',
					h1: {color: '#a8b2d1'},
					h2: {color: '#a8b2d1'},
					h3: {color: '#a8b2d1'},
					strong: {color: '#a8b2d1'},
				  },
				},
			}),
		},
	},
	variants: {
		typography: ['dark'],
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
}
