import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect} from "react"
import ThemeToggler from './ThemeToggler'
import useScrollDirection from "./useScrollDirection"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark} from '@fortawesome/free-solid-svg-icons'
import Logo from "./Logo"


export default function Navbar({ open, setOpen}) {
	const [screenWidth, setScreenWidth] = useState(0)
	const router = useRouter()

	// Scroll-up triggered navigation bar
	const goingUp = useScrollDirection();
	const [scrolled, setScrolled] = useState(false);

	// Close the menu every time the page changes
    useEffect(() => {
        if (open) {
          setOpen(!open);
        }
    }, [router.asPath]);

	// Handle changes in screen width
	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);

			// close mobile menu if larger than [sm] breakpoint
			if(window.innerWidth > 640)
				setOpen(false);
			
		}
		changeWidth(); // change value of screenwidth when component is mounted
		window.addEventListener('resize', changeWidth) // add resize event listener

		return () =>{
			window.removeEventListener('resize', changeWidth); // cleanup
		} 
    }, []);


	useEffect(() => {
		window.onscroll = function() {
			if (window.scrollY > 72)
				setScrolled(true);
			else
				setScrolled(false);
		};
	}, []);

	const menuToggleClick = () =>{
		setOpen(!open);
	}

	return (
		<div className={`sticky h-[72px] z-50 sm:opacity-95
						bg-white text-black dark:bg-trappedDarkness dark:text-awesomeViolet 
						px-6 py-5
						transition-[top] duration-1000
						${goingUp ? 'top-0' : 'top-[-72px]'}
						${scrolled ? 'shadow-md dark:shadow-gray-900' : ''}
						`}
		>
			<nav className="max-w-[1024px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between">
				<Link href="/">
					<a><Logo/></a>
				</Link>

				<div className="absolute top-0 right-0 px-6 pt-8 sm:hidden" onClick={menuToggleClick}>
					<button>
						<FontAwesomeIcon icon={open ? faXmark: faBars} size="lg"/>
					</button>
				</div>

				{ (open || screenWidth > 640) && 
				(<div className="absolute top-full inset-x-0 text-center sm:relative sm:w-max">
					<ul className={`w-full flex flex-col space-y-12 sm:space-y-0
								   sm:w-max sm:flex-row sm:items-center sm:h-auto
								   ${open ? 'bg-white dark:bg-trappedDarkness h-screen pt-24 text-xl' : 'h-0'}
								   `}
					>
						<li><Link href="/about"><a className="nav-link">About</a></Link></li>
						<li><Link href="/projects"><a className="nav-link">Projects</a></Link></li>
						<li><Link href="/blog"><a className="nav-link">Blog</a></Link></li>
						<li className="sm:hidden"><Link href="/contact"><a className="nav-link">Contact</a></Link></li>
						<li className="sm:ml-3"><ThemeToggler/></li>
					</ul>
				</div>)
				}
			</nav>
		</div>
	)
}