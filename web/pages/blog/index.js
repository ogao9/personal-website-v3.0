import Link from 'next/link'
import MetaHead from "../../components/MetaHead";
import groq from 'groq'
import client from '../../lib/client'
import { urlFor, prettyDate, getReadingTime } from '../../lib/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'


function BlogStrip({post}){
    return(
        <div className="flex max-w-2xl items-center justify-between border-b mb-8 pb-2">
            <div className="flex-initial mr-4">
                <h1 className="text-lg sm:text-2xl font-bold">{post.title}</h1>
                <h3 className="hidden text-sm sm:block sm:text-base">{post.excerpt}</h3>

                <section className="flex text-xs sm:text-sm text-gray-700 dark:text-gray-50 mt-2">
					<span>{prettyDate(post.publishedAt)}</span><div className="px-1">&middot;</div>
					<span>{getReadingTime(post.body)}</span><div className="px-1">&middot;</div>

                    <div className="bg-gray-200 text-gray-700 rounded-xl px-1 sm:px-2">
                        {post.category}
                    </div>
                </section>
            </div>

            <div className="flex-shrink-0">
                <img
                    src={urlFor(post.mainImage).url()}
                    alt="Blog Cover Image"
                    className="w-20 sm:w-28 aspect-video"
                />
            </div>
        </div>
    )
}


export default function Blog({ posts }) {
	return (
		<>
			<MetaHead
				title="Blog"
				description="Welcome to my blog."
			/>
			
			<div className="pt-16 sm:pt-20">
				<section className="pb-12">
					<h1 className="text-5xl font-semibold mb-3">
						Blog
						<FontAwesomeIcon icon={faPen} className="text-maize ml-6"/>
					</h1>
					<p className="max-w-lg">
						Welcome to my cafe. A peaceful place to enjoy a hot cup of tea, enjoy the plants around, and read thoughtful content.
					</p>
				</section>

				<section className="">
					{
						posts.map((obj, idx) => (
							<Link href={`/blog/${obj.slug}`} key={idx}>
								<a><BlogStrip post={obj}/></a>
							</Link>
						))
					}
                </section>
			</div>
		</>
	)
}


export async function getStaticProps(){
	const query = groq`*[_type == "post"]{
		title,
		excerpt,
		"slug" : slug.current,
		"category" : category->title,
		mainImage,
		publishedAt,
		body[]{
                ..., 
                asset->{
                ...,
                "_key": _id
                }
        }
	}|order(date desc)`

	const posts =  await client.fetch(query)

    return{
        props:{
            posts
        }
    }
}