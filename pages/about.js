import Head from "next/head"
import Link from "next/link"
import Image from "next/image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faLinkedinIn, faGithub, faGithubSquare } from "@fortawesome/free-brands-svg-icons"

export default function About() {
	return (
		<>
		<Head>
			<title>Oliver Gao | About</title>
			<meta name="description" content="About me." />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<div className="pt-16 sm:pt-20">
			<section className="lg:flex justify-center pb-12">
				<div className="lg:w-[36rem] lg:mr-12">
					<h1 className="text-6xl sm:text-7xl font-semibold">About me.</h1>
				</div>
				<div className="lg:w-[375px]"/> {/* Ghost Element with fixed with to make the h1 line up with text below */}
			</section>
			
			<div className="lg:flex justify-center">
				<div className="lg:mr-12">
					<section className="max-w-xl md:text-lg">
						<p className="mb-6">
							I’m a second-year student at the University of Michigan studying computer science and data science.
							I'm interested in building meaningful software that helps people, extracting valuable insight from data, and creating beautiful visual products.
						</p>
						<p className="mb-6">
							Currently, I'm a student web designer at the Michigan Institute for Data Science and a research assisant analyzing opioid shipment data with Prof. John Kloosterman.
						</p>
						<p className="mb-6">
							Besides tech related things, I enjoy running, playing the violin in the Michigan Pops Orchestra, watching Youtube videos, and eating snacks.
						</p>
					</section>
					<section className="flex space-x-8 my-10">
						<a href="https://www.linkedin.com/in/oliver-gao/" target="_blank">
							<FontAwesomeIcon icon={faLinkedinIn} size="2x"/>
						</a>
						<a href="https://github.com/ogao9" target="_blank">
							<FontAwesomeIcon icon={faGithub} size="2x"/>
						</a>
						<Link href="/resume.pdf">
							<a><FontAwesomeIcon icon={faFilePdf} size="2x"/></a>
						</Link>
						<Link href="/contact">
							<a><FontAwesomeIcon icon={faPaperPlane} size="2x"/></a>
						</Link>
					</section>
				</div>
				
				<section>
					<Image
						src="/oliverRunning.png"
						alt="Picture of me running"
						width={375}
						height={375}
						className="rounded-md"
					/>
				</section>
			</div>
		</div>
		</>
	)
}
