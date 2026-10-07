import { useEffect, useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem('hz-theme', dark ? 'dark' : 'light')
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-pressed={dark}
      aria-label="Modo oscuro"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-ink hover:bg-ink hover:text-canvas transition-colors"
    >
      {dark ? <Moon size={20} weight="fill" aria-hidden="true" /> : <Sun size={20} weight="fill" aria-hidden="true" />}
    </button>
  )
}
