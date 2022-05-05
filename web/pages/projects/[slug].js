import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import MetaHead from '../../components/MetaHead';
import client from '../../lib/client'
import {urlFor} from '../../lib/utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from "@fortawesome/free-brands-svg-icons"


export default function SingleProjectDetails({ project }) {
    return (
        <>
            <MetaHead title={`${project.title}`} description="An overview and analysis of my project"/>

            <div className="max-w-3xl mx-auto py-12 sm:pt-20">
                <section>
                    <div className='mb-5'>
                        <h1 className="text-4xl lg:text-5xl font-semibold mb-4">{project.title}</h1>

                        {project.externalLink &&
                            <a href={project.externalLink} target="_blank" rel="noreferrer" className='project-link block mb-2'>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-1 "/>
                                Live Example
                            </a>
                        }
                        
                        {project.githubLink &&
                            <a href={project.githubLink} target="_blank" rel="noreferrer" className='project-link block mb-1'>
                                <FontAwesomeIcon icon={faGithub} className="mr-1"/>
                                Github Repository
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
                        imageOptions={{ fit: "max" }}
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

