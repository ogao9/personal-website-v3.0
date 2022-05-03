import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import MetaHead from '../../components/MetaHead';
import client from '../../lib/client'
import {urlFor} from '../../lib/utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function SingleProjectDetails({ project }) {
    return (
        <>
            <MetaHead title={`${project.title}`} description="An overview and analysis of my project"/>

            <div className="max-w-3xl mx-auto py-12 sm:pt-20">
                <section>
                    <div className='mb-4'>
                        <h1 className="text-4xl lg:text-5xl font-semibold mb-2">{project.title}</h1>
                        {project.externalLink &&
                            <a href={project.externalLink} target="_blank" rel="noreferrer">
                                <p className="projectLink">Live Demo <FontAwesomeIcon icon={faArrowRight} className="inline w-2 ml-1 arrow"/></p>
                            </a>
                        }
                        
                        {project.githubLink &&
                            <a href={project.githubLink} target="_blank" rel="noreferrer">
                                <p className="projectLink">Github Repository<FontAwesomeIcon icon={faArrowRight} className="inline w-2 ml-1 arrow"/></p>
                            </a>
                        }
                    </div>
                    <img
                        src={urlFor(project.image).url()}
                        alt={`Cover image for my project: ${project.title}`}
                        className="w-full object-cover aspect-video"
                    />
                </section>

                <article className="prose prose-lg dark:prose-dark max-w-full mt-4">
                    <BlockContent
                        blocks={project.body}
                        imageOptions={{ w: 800, h: 450, fit: "max" }}
                    />
                </article>
            </div>
        </>
    );
}

export async function getStaticPaths(){
    const allPosts = await client.fetch('*[_type == "Project"]')
    const paths = await allPosts.map((project) => ({ params: { slug: project.slug.current } }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const { slug = "" } = context.params;
    const query = groq`*[_type == "Project" && slug.current == $slug][0]{
        ..., 
        "slug" : slug.current, 
        body[]{
            ..., 
            asset->{
              ...,
              "_key": _id
            }
        },
    }`
    const project =  await client.fetch(query, { slug })

    return{
        props:{
            project
        }
    }
}

