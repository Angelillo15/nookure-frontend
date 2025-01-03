import type { Config } from 'tailwindcss';
import tailwindcssViewTransition from 'tailwindcss-view-transitions';

const { nextui } = require('@nextui-org/react');

export default {
    content: [
        './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    '"Geist"',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
                mono: [
                    '"Geist Mono"',
                    'ui-monospace',
                    'SFMono-Regular',
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    '"Liberation Mono"',
                    '"Courier New"',
                    'monospace',
                ]
            },
            colors: {
                default: {
                    DEFAULT: '#fff',
                    foreground: '#000',
                    100: '#f5f5f5',
                    200: '#eeeeee',
                    300: '#e0e0e0',
                    400: '#bdbdbd',
                    500: '#9e9e9e',
                    600: '#757575',
                    700: '#616161',
                    800: '#424242',
                    900: '#212121',
                },
                background: {
                    DEFAULT: '#000',
                }
            }
        },
    },
    darkMode: 'class',
    plugins: [nextui(), tailwindcssViewTransition],
} satisfies Config;
