import Link from 'next/link'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import blocksToHtml from "@sanity/block-content-to-html"
import readingTime from "reading-time";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import MetaHead from "../../components/MetaHead";
import client from '../../client'


function prettyDate(dateString){
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}


function getReadingTime(content){
    const html = blocksToHtml({
        blocks: content,
      })

    const stats = readingTime(html);

    return Math.ceil(stats.minutes) + ' min read';
}


function urlFor (source) {
	return imageUrlBuilder(client).image(source)
}


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
                    className="w-20 sm:w-28 aspect-[4/3]"
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
		"category" : categories[0]->title,
		mainImage,
		publishedAt,
		body
	}|order(date desc)`

	const posts =  await client.fetch(query)

    return{
        props:{
            posts
        }
    }
}