import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import ThemeToggler from './ThemeToggler'

export default function Navbar() {
	// logic behind showing the links
	//		show if:
	// 		1. open is set to true  - OR - 
	//		2. the screen width is larger than the [md] breakpoint (768px)

	const [open, setOpen] = useState(false)
	const [screenWidth, setScreenWidth] = useState(0)
	const router = useRouter()

	// Close the menu every time the page changes
    useEffect(() => {
        if (open) {
          setOpen(!open);
        }
    }, [router.asPath]);

	// Change value of screenwidth when component is mounted AND add an event listener
	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		}

		changeWidth(); // initial call when page is mounted
	  
		window.addEventListener('resize', changeWidth) // add event listener

		return () =>{
			window.removeEventListener('resize', changeWidth); // cleanup
		} 
    }, []);


	return (
		<div className="sticky top-0 px-6 dark:bg-trappedDarkness dark:text-awesomeViolet">
			<nav className="max-w-[1024px] mx-auto flex flex-col items-start md:flex-row md:items-end justify-between">
				<div className="py-4">
					<Link href="/">
						<a><h1 className="text-4xl">Oliver Gao</h1></a>
					</Link>
				</div>

				<div className="absolute top-0 right-0 py-4 px-6 md:hidden" onClick={()=>setOpen(!open)}>
					<button>
						<FontAwesomeIcon icon={faBars} size="2x" />
					</button>
				</div>

				{ (open || screenWidth > 768) && (
				<div className="absolute top-full inset-x-0 md:w-max md:relative">
					<ul className='w-full flex flex-col space-y-6 pb-4 md:w-max md:flex-row md:space-y-0 md:space-x-8 md:py-4 md:items-center text-center'>
						<li><Link href="/about"><a>About</a></Link></li>
						<li><Link href="/projects"><a>Projects</a></Link></li>
						<li><Link href="/blog"><a>Blog</a></Link></li>
						<li className=""><ThemeToggler/></li>
						<li className="md:hidden"><Link href="/contact"><a>Contact</a></Link></li>
					</ul>
				</div>
				)}
			</nav>
		</div>
	)
}
