module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'navyblue' : '#0A1D2F',
				'textslate': '#8892B0'
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
