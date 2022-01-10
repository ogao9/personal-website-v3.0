import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({children}) {
	return (
		<>
			<Navbar/>
			<div className="bg-navyblue text-textslate p-6">
				<main className='max-w-[1140px] mx-auto min-h-screen'>
					{children}
				</main>
			</div>
			<Footer/>
		</>
	)
}
