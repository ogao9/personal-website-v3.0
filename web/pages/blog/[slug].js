import MetaHead from '../../components/MetaHead'
import client from '../../lib/client'
import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'

import { urlFor, prettyDate } from "../../lib/utils";



export default function Post({post}) {
    return (
        <>
            <MetaHead title={post.title} description={post.excerpt}/>

            <div className="max-w-3xl mx-auto py-12 sm:pt-20">
                <section className="mb-4">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-1">{post.title}</h1>
                    <p className="text-base sm:text-lg mb-4">{post.excerpt}</p>

                    <div className="flex mb-4">
                        <img
                            src={urlFor(post.authorImage).width(50).height(50).url()}
                            alt={`Profile picture for author: ${post.authorName}`}
                            className="rounded-full"
                        />
                        <div className="ml-4">
                            <p>{post.authorName}</p>
                            <p>{prettyDate(post.publishedAt)}</p>
                        </div>
                    </div>

                    <img
                        src={urlFor(post.mainImage).url()}
                        alt={`Main image for blog post ${post.title}`}
                        className="w-full object-cover aspect-video"
                    />
                </section>


                <article className="prose prose-lg dark:prose-dark max-w-full">
                    <BlockContent
                        blocks={post.body}
                        imageOptions={{ w: 480, h: 360, fit: "max" }}
                    />
                </article>
            </div>
        </>
    );
}

export async function getStaticPaths(){
    const allPosts = await client.fetch('*[_type == "post"]')
    const paths = await allPosts.map((post) => ({ params: { slug: post.slug.current } }))

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps(context){
    // const postSlug = context.params.slug;
    const { slug = "" } = context.params    // It's important to default the slug so that it doesn't return "undefined"

    const query = groq`*[_type == "post" && slug.current == $slug][0]{
            title,
            "slug": slug.current,
            "category": category->title,
            excerpt,
            mainImage,
            publishedAt,
            "authorName": author->name,
            "authorImage": author->image,
            body[]{
                ..., 
                asset->{
                ...,
                "_key": _id
                }
            }
        }`
    const post = await client.fetch( query, { slug })  // slug takes the place of $slug in the query: this is like printf in C

    return{
        props:{
            post
        }
    }
}
