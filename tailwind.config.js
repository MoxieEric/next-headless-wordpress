/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./wordpress/app/public/wp-content/themes/headless-duck/blocks/section/src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [
		// {
		// 	pattern: 'w-*',
		// },
		// {
		// 	pattern: 'text-*',
		// },
		{
			pattern: /bg-*/,
		},
	],
}
