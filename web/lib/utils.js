import client from './client'
import imageUrlBuilder from '@sanity/image-url'
import blocksToHtml from "@sanity/block-content-to-html"
import readingTime from "reading-time";

export function urlFor (source) {
	return imageUrlBuilder(client).image(source)
}

export function prettyDate(dateString){
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}


export function getReadingTime(content){
    const html = blocksToHtml({
        blocks: content,
      })

    const stats = readingTime(html);

    return Math.ceil(stats.minutes) + ' min read';
}
