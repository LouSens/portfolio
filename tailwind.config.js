/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./design/**/*.{js,jsx,html}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            colors: {
                // Theme-aware tokens: the RGB triplets live in index.css and flip with [data-theme].
                // Every existing text-white / bg-white/x / border-white/x therefore becomes
                // "foreground on background" in both themes.
                white: 'rgb(var(--fg) / <alpha-value>)',
                panel: 'rgb(var(--panel-rgb) / <alpha-value>)',
                canvas: 'rgb(var(--bg-rgb) / <alpha-value>)',
                surface: {
                    DEFAULT: '#070709',
                    1: '#0D0E12',
                    2: '#12141B',
                    3: '#181A24',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
                    hover: '#FF431A',
                    light: '#FF8C69',
                    glow: 'rgba(255, 90, 54, 0.15)',
                },
            },
        },
    },
    plugins: [],
};
