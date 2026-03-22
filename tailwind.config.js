/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Syne', 'system-ui', 'sans-serif'],
                sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                surface: {
                    DEFAULT: '#0C0C0C',
                    1: '#141414',
                    2: '#1A1A1A',
                    3: '#222222',
                },
                accent: {
                    DEFAULT: '#D4644A',
                },
            },
        },
    },
    plugins: [],
};
