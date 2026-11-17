import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090909',
        surface: '#0E0E0E',
        bone: '#F2F0EB',
        signal: '#E5484D',
        muted: '#929292',
        hairline: 'rgba(242, 240, 235, 0.10)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5.25rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      maxWidth: { shell: '78rem', prose: '42rem' },
      spacing: { section: 'clamp(5rem, 12vh, 9rem)' },
      transitionTimingFunction: { editorial: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        'dash-flow': { to: { strokeDashoffset: '-24' } },
        'pulse-node': { '0%,100%': { opacity: '0.35' }, '50%': { opacity: '1' } },
      },
      animation: {
        'dash-flow': 'dash-flow 1.6s linear infinite',
        'pulse-node': 'pulse-node 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
