const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './src/**/*.{html,ts}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f6f7f1',
                    100: '#e9eedb',
                    200: '#d4deb8',
                    300: '#b9c98c',
                    400: '#a0b466',
                    500: '#839a47',
                    600: '#677b37',
                    700: '#52612d',
                    800: '#434f28',
                    900: '#3a4325',
                    950: '#1e2413',
                },
                secondary: colors.amber,
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}