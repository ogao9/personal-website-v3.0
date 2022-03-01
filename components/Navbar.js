import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, fa} from '@fortawesome/free-solid-svg-icons'
import { faXmark} from '@fortawesome/free-regular-svg-icons'

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

			if(window.innerWidth < 768)
				setOpen(false);
		}

		changeWidth(); // initial call when page is mounted
	  
		window.addEventListener('resize', changeWidth) // add event listener

		return () =>{
			window.removeEventListener('resize', changeWidth); // cleanup
		} 
    }, []);


	return (
		<div className="sticky top-0 px-6 py-5 bg-white text-black dark:bg-trappedDarkness dark:text-awesomeViolet z-50">
			<nav className="max-w-[1024px] mx-auto flex flex-col items-start md:flex-row md:items-end justify-between">
				<Link href="/">
					<a><h1 className="text-4xl">Oliver Gao</h1></a>
				</Link>

				<div className="absolute top-0 right-0 self-end px-6 pt-5 md:hidden" onClick={()=>setOpen(!open)}>
					<button>
						<FontAwesomeIcon icon={open? faXmark: faBars} size="lg"/>
					</button>
				</div>

				{ (open || screenWidth > 768) && (
				<div className="absolute top-full inset-x-0 md:w-max md:relative text-center">
					<ul className='w-full flex flex-col space-y-6 pb-4 md:w-max md:flex-row md:space-y-0 md:space-x-8 md:pb-0'>
						<li><Link href="/about"><a>About</a></Link></li>
						<li><Link href="/projects"><a>Projects</a></Link></li>
						<li><Link href="/blog"><a>Blog</a></Link></li>
						<li className="md:hidden"><Link href="/contact"><a>Contact</a></Link></li>
						<li><ThemeToggler/></li>
					</ul>
				</div>
				)}
			</nav>
		</div>
	)
}
