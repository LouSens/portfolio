/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            colors: {
                surface: {
                    DEFAULT: '#070709',
                    1: '#0D0E12',
                    2: '#12141B',
                    3: '#181A24',
                },
                accent: {
                    DEFAULT: '#FF5A36',
                    hover: '#FF431A',
                    light: '#FF8C69',
                    glow: 'rgba(255, 90, 54, 0.15)',
                },
            },
        },
    },
    plugins: [],
};
