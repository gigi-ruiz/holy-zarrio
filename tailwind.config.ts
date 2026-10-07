import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        // Tokens que cambian con el tema (ver index.css)
        canvas: token('canvas'),
        surface: token('surface'),
        raised: token('raised'),
        ink: token('ink'),
        mute: token('mute'),
        primary: token('primary'),
        'on-primary': token('on-primary'),
        accent: token('accent'),
        rar1: token('rar1'),
        rar2: token('rar2'),
        rar3: token('rar3'),
        rar4: token('rar4'),
        rar5: token('rar5'),
        // Colores fijos de marca. Siempre se combinan con `night` como texto.
        night: '#1B1030',
        cream: '#FFF7EC',
        coral: '#FF6B57',
        sun: '#FFC83D',
        pink: '#FF7AC6',
        sky: '#4FD8EB',
        lime: '#C8F169',
        violet: '#7C4DFF',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '100%': { transform: 'translate3d(6vw,-5vh,0) scale(1.12)' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translateY(-14px) rotate(calc(var(--r, 0deg) + 2deg))' },
        },
        twinkle: { '0%,100%': { opacity: '.25', transform: 'scale(.8)' }, '50%': { opacity: '1', transform: 'scale(1.15)' } },
        sheen: { from: { transform: 'translateX(-90px)' }, to: { transform: 'translateX(320px)' } },
        shake: {
          '0%,100%': { transform: 'translateX(0) rotate(0)' },
          '20%': { transform: 'translateX(-8px) rotate(-4deg)' },
          '40%': { transform: 'translateX(8px) rotate(4deg)' },
          '60%': { transform: 'translateX(-6px) rotate(-3deg)' },
          '80%': { transform: 'translateX(6px) rotate(3deg)' },
        },
        tear: {
          '0%': { transform: 'translate(0,0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translate(40px,-150px) rotate(24deg)', opacity: '0' },
        },
        rise: {
          '0%': { transform: 'translateY(60px) scale(.7)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translate(0,0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translate(var(--x), var(--y)) rotate(var(--rot))', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        drift: 'drift 22s ease-in-out infinite alternate',
        bob: 'bob 6s ease-in-out infinite',
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        sheen: 'sheen 4.2s ease-in-out infinite',
        shake: 'shake .7s ease-in-out',
        tear: '.7s ease-in forwards tear',
        rise: '.8s cubic-bezier(.2,.9,.3,1.2) forwards rise',
        confetti: '1.4s ease-out forwards confetti',
      },
    },
  },
  plugins: [],
} satisfies Config
