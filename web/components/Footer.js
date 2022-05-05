import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

export default function Footer() {
	return (
		<footer className="px-6">
			<div className="max-w-[1024px] mx-auto flex flex-col space-y-6 md:flex-row md:space-y-0 items-center justify-center md:justify-between py-6">
				<p>Created with <FontAwesomeIcon icon={faHeart} size="xs" className="mx-[2px]"/> by Me</p>

				<nav>
					<ul className="flex space-x-8">
						<li><Link href="/about"><a>About</a></Link></li>
						<li><Link href="/projects"><a>Projects</a></Link></li>
						<li><Link href="/blog"><a>Blog</a></Link></li>
						<li><Link href="/resume.pdf"><a target="blank">Resume</a></Link></li>
						<li><Link href="/contact"><a>Contact</a></Link></li>
					</ul>
				</nav>
			</div>
		</footer>
	)
}


