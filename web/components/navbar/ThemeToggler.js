import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export default function ThemeToggler() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Only show UI when mounted on client to avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <div className='px-1 bg-gray-200 dark:bg-slate-700 rounded'>
			<FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="w-6 inline"/> 
		</div>
    </button>
  )
}