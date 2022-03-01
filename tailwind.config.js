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
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
