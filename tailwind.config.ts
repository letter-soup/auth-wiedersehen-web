import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    forms,
  ],
} satisfies Config

