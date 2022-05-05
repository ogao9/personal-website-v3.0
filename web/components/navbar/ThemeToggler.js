import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export default function ThemeToggler() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const [hover, setHover] = useState(false);

	// Only show UI when mounted on client to avoid hydration mismatch
	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	return (
		<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<div className='relative bg-gray-200 dark:bg-slate-700 rounded px-1'>
				<FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="w-6 inline"/> 

				{hover && 
					<div className="w-max absolute left-[-25px] bottom-[-32px]
									bg-slate-700 text-awesomeViolet text-xs
									p-1 rounded-lg"
					>
						Turn {theme === "dark" ? "on" : "off"} the light
					</div>
				}
			</div>
		</button>
	)
}