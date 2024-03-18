/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({addUtilities}) {
			addUtilities({
				".no-scrollbar::-webkit-scrollbar": {
					"background-color": "transparent",
					width: "0.5vw",
					height: "0.5vw",
				},
				".no-scrollbar::-webkit-scrollbar-thumb": {
					"background-color": "rgb(140, 140, 140)",
					border: "0.15vw solid transparent",
					"border-radius": "1vw",
					"background-clip": "content-box",
				},
				".no-scrollbar::-webkit-scrollbar-track": {
					"background-color": "rgb(200, 200, 200)",
					"border-radius": "1vw",
				},
				".no-scrollbar::-webkit-scrollbar-thumb:hover": {
					"background-color": "rgb(100, 100, 100)",
				},
				".date-picker::-webkit-calendar-picker-indicator": {
					width: "100%",
					opacity: "0",
				},
			});
		}),
	],
};
