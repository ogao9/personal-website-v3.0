import Link from "next/link"
import MetaHead from "../components/MetaHead"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <>
		<MetaHead
			title="Oliver Gao"
			description="Hi! I'm Oliver. I'm a student at the University of Michigan studying Computer Science"
		/>

		<div className="pt-20 sm:pt-32">
			<section className="text-center pb-16">
				<h1 className="text-6xl sm:text-7xl font-semibold"> Hello! I'm Oliver.</h1>
			</section>
			
			<section className="max-w-2xl mx-auto text-center text-nightly dark:text-awesomeViolet">
				<p className="md:text-lg">I’m a second-year student at the <span className="text-maize font-semibold">University of Michigan</span> studying computer science and data science.
					I'm interested in building meaningful software and extracting valuable insight from data to do good in the world.
				</p>
			</section>

			<section className="w-full flex justify-center space-x-6 pt-20">
				<Link href="/projects">
					<a><button className="px-3 py-2">View my work<FontAwesomeIcon icon={faLongArrowAltRight} className="ml-2"/></button></a>
				</Link>
				<Link href="/about">
					<a><button className="px-3 py-2">More about me<FontAwesomeIcon icon={faLongArrowAltRight} className="ml-2"/></button></a>
				</Link>
			</section>
		</div>
    </>
  )
}
