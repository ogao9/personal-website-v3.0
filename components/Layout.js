import { useState} from "react"

import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({children}) {
	const [open, setOpen] = useState(false);

	const changeOpen = (bool) => {
		setOpen(bool);
	}

	return (
		<>
			<div className={`dark:bg-trappedDarkness dark:text-awesomeViolet
							 ${open ? 'h-screen overflow-hidden' : ''}
							`}
			>
				<Navbar open={open} setOpen={changeOpen}/>
				<div className="p-6">
					<main className='max-w-[1024px] mx-auto min-h-screen'>
						{children}
					</main>
				</div>
				<Footer/>
			</div>
		</>
	)
}

//