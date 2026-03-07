/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#8B0000',
                    600: '#700000',
                    50: '#FFF5F5',
                },
                background: '#F7F6F3',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            spacing: {
                '8': '8px',
                '16': '16px',
                '24': '24px',
                '40': '40px',
                '64': '64px',
            }
        },
    },
    plugins: [],
}
