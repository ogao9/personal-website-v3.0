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
			
			<section className="max-w-2xl mx-auto text-center">
				<p className="md:text-lg">I’m a second-year student at the University of Michigan studying computer science and data science.
					I'm interested in building meaningful software that helps people, extracting valuable insight from data, and creating beautiful visual products.
				</p>
			</section>

			<section className="w-full flex justify-center space-x-6 pt-20">
				<Link href="/projects">
					<a><button className="border-2 border-yellow-600 px-3 py-2 rounded">View my work <FontAwesomeIcon icon={faLongArrowAltRight}/></button></a>
				</Link>
				<Link href="/about">
					<a><button className="border-2 border-yellow-600 px-3 py-2 rounded">More about me <FontAwesomeIcon icon={faLongArrowAltRight}/></button></a>
				</Link>
			</section>
		</div>
    </>
  )
}
