import Head from "next/head"
import Link from "next/link"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <>
		<Head>
			<title>Oliver Gao</title>
			<meta name="description" content="Hi! I'm Oliver. I'm a student at the University of Michigan studying Computer Science" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<div className="pt-20 sm:pt-32">
			<section className="text-center pb-12">
				<h1 className="text-6xl sm:text-7xl font-semibold"> Hello! I'm Oliver.</h1>
			</section>
			
			<section className="max-w-2xl mx-auto text-center text-nightly">
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
