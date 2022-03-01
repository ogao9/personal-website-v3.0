import Link from "next/link"
import Image from "next/image"

import MetaHead from "../components/MetaHead"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"

export default function About() {
	return (
		<>
		<MetaHead
			title="Oliver Gao | About"
			description="About me"
		/>

		<div className="pt-16 sm:pt-20">
			<section className="pb-12">
				<h1 className="text-6xl sm:text-7xl font-semibold">About Me</h1>
			</section>
			
			<section className="lg:flex justify-between">
				<div className="lg:mr-12">
					<section className="max-w-xl md:text-lg">
						<p className="mb-6">
							I’m a second-year student at the <span className="text-maize font-semibold">University of Michigan</span> studying computer science and data science.
							I'm interested in building meaningful software and extracting valuable insight from data to do good in the world.
						</p>
						<p className="mb-6">
							Currently, I'm a student web designer at the Michigan Institute for Data Science and a research assisant analyzing opioid shipment data with Prof. John Kloosterman.
						</p>
						<p className="mb-6">
							Besides tech related things, I enjoy running, playing the violin in the Michigan Pops Orchestra, watching Youtube videos, and eating food.
						</p>
					</section>
					<section className="flex space-x-8 my-10">
						<a href="https://www.linkedin.com/in/oliver-gao/" target="_blank">
							<FontAwesomeIcon icon={faLinkedinIn} size="lg" /> LinkedIn
						</a>
						<a href="https://github.com/ogao9" target="_blank">
							<FontAwesomeIcon icon={faGithub} size="lg"/> Github
						</a>
						<Link href="/resume.pdf">
							<a><FontAwesomeIcon icon={faFilePdf} size="lg"/> Resume</a> 
						</Link>
						<Link href="/contact">
							<a><FontAwesomeIcon icon={faPaperPlane} size="lg"/> Contact Me</a> 
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
			</section>
		</div>
		</>
	)
}
