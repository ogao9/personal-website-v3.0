import { useState } from 'react';
import Link from 'next/link'
import MetaHead from '../../components/MetaHead'
import groq from 'groq'
import client from '../../lib/client';
import { urlFor } from '../../lib/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'


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

function ProjectCard({ project }) {
	const [hover, setHover] = useState(false);

    return (
        <Link href={`/projects/${project.slug}`}>
            <a onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <article className="grid grid-rows-[max-content_4fr_1fr] 
									max-w-xs w-full h-full 
									border dark:border-gray-800
									dark:bg-[#0d243a]
									rounded-md shadow-md hover:shadow-lg"
				>
                    <section className="relative mb-3">
						<img
							src={urlFor(project.image).url()}
							alt={`Cover photo for my ${project.title} project`}
							className="object-cover aspect-video rounded-md"
						/>
						{hover && <ImageOverlay/>}
                    </section>

                    <section className="mb-2 px-3">
                        <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
                        <p className="leading-snug">{project.description}</p>
                    </section>
                    
                    <section className="self-end opacity-80 mb-2 px-3">
                        <p>{project.category}</p>
                    </section>
                </article>
            </a>
        </Link>
    );
}


function ImageOverlay(){
    return (
		<div className='absolute top-0 inset-0 w-full h-full bg-gray-900 opacity-90 rounded-md grid place-items-center text-white text-center'>
			<div>
				<FontAwesomeIcon icon={faCircleInfo} size="lg"/>
				<p className=' text-lg'>View the Details</p>
			</div>
		</div>
	)
}


export async function getStaticProps(){
	const query = groq`*[_type == "Project"]{
		title,
		description,
		"slug" : slug.current,
		image,
		category,
		date
	}|order(date desc)`

	const projects =  await client.fetch(query)

    return{
        props:{
            projects
        }
    }
}