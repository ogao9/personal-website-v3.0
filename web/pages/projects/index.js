import Link from 'next/link'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import MetaHead from '../../components/MetaHead'


function urlFor (source) {
	return imageUrlBuilder(client).image(source)
}


function ProjectCard({ project }) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <a>
                <article className="grid grid-rows-[max-content_4fr_1fr] w-full h-full max-w-xs border dark:border-gray-800 shadow-sm ">
                    <section className="mb-3 overflow-hidden">
                        <img
                            src={urlFor(project.image).url()}
                            alt={`Cover photo for my ${project.title} project`}
                            className="object-cover aspect-video"
                        />
                    </section>

                    <section className="mb-2 px-3">
                        <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
                        <p className="leading-snug">{project.description}</p>
                    </section>
                    
                    <section className="self-end mb-2 px-3">
                        <p>React / Python / Data </p>
                    </section>
                </article>
            </a>
        </Link>
    );
}


export default function Projects({projects}) {
	return (
		<>
			<MetaHead
				title="Projects"
				description="A collection of my personal and work projects."
			/>

			<div className="pt-16 sm:pt-20 sm:pb-20">
				<section className="pb-12">
					<h1 className="text-6xl sm:text-7xl font-semibold mb-3">Projects</h1>
					<p className='pl-1'>A collection of my personal and work projects. Click on each project to learn more!</p>
				</section>

				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[_1fr] justify-items-center gap-8">
					{
						projects.map((project, idx)=>(
							<ProjectCard key={idx} project={project}/>
						))
					}
				</section>
			</div>
		</>
	)
}


export async function getStaticProps(){
	const query = groq`*[_type == "Project"]{
		title,
		description,
		"slug" : slug.current,
		image
	}|order(date desc)`

	const projects =  await client.fetch(query)

    return{
        props:{
            projects
        }
    }
}