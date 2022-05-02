// import BlockContent from '@sanity/block-content-to-react'
// import BlogPostHeader from '../../components/BlogPostHeader';
import MetaHead from '../../components/MetaHead'
import client from '../../client'
import groq from 'groq'

// import { getPostData, getPostPaths, urlFor } from "../../lib/sanity";

export default function Post({post}) {
    return (
        <>
            <h1>{post?.slug?.current}</h1>
            {/* <MetaHead title={`${post.title}`} description={`${post.excerpt}`}/>

            <main className="px-8 md:pl-16 lg:pl-48 pt-24 pb-12">
                <BlogPostHeader postInfo={post}/>

                <section className="max-w-3xl">
                    <img
                        src={urlFor(post.image).url()}
                        alt="Blog post cover"
                        className="w-full h-auto object-cover overflow-hidden "
                    />
                </section>

                <section className="max-w-3xl pb-8">
                    <article className="prose prose-lg dark:prose-dark max-w-full">
                        <BlockContent
                            blocks={post.body}
                            imageOptions={{ w: 480, h: 360, fit: "max" }}
                        />
                    </article>
                </section>
            </main> */}
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

    const query = groq`*[_type == "post" && slug.current == $slug][0]`
    const post = await client.fetch( query, { slug })  // slug takes the place of $slug in the query: this is like printf in C

    return{
        props:{
            post
        }
    }
}



// export async function getPostData(postSlug){
//     const query = groq`*[_type == "post" && slug.current == $postSlug][0]{
//         title,
//         "slug": slug.current,
//         "category": category->title,
//         excerpt,
//         image,
//         publishedAt,
//         "authorName": author->name,
//         "authorImage": author->image,
//         body[]{
//             ..., 
//             asset->{
//               ...,
//               "_key": _id
//             }
//         }
//       }`
//     const data =  await sanityClient.fetch(query, { postSlug })

//     return data;
// }