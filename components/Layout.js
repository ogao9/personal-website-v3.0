import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({children}) {
	return (
		<>
			<Navbar/>
			<div className="dark:bg-trappedDarkness dark:text-awesomeViolet p-6">
				<main className='max-w-[1024px] mx-auto min-h-screen'>
					{children}
				</main>
			</div>
			<Footer/>
		</>
	)
}
