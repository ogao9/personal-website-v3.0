import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

async function addItem({name, email, message}) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				Name: { 
					title: [
						{
							text: {
								content: name
							}
						}
					]
				},
				Email: { 
					email: email
				},
				Status: {
					select: {
						name: 'Unread',
					},
				},
			},
			children: [
				{
				  object: 'block',
				  type: 'paragraph',
				  paragraph: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: message,
							},
						},
					],
				  },
				},
			]
		})
		console.log("Success! Entry added.")
		return true;
	} catch (error) {
		console.error(error.body)
		return false;
	}
}

async function inboxFull(){
	const INBOX_CAPACITY = 50;

	try{
		const response = await notion.databases.query({
			database_id: databaseId,
		})
	
		return response.results.length >= INBOX_CAPACITY;
	}
	catch (error) {
		console.error(error)
		return false;
	}
}


// This function is a request handler
export default async function handler(req, res) {
	if(req.method !== 'POST'){
		res.status(405).send({ error: `method ${req.method} not allowed`});
		return;
	}

	// Check if inbox is full
	if(await inboxFull()){
		res.status(403).send("Inbox Full. Message failed to send.")
		return;
	}

	// Attempt to add item
	if(await addItem(req.body))
		res.status(201).send("Success! Message was sent.")
	else
		res.status(500).send("Error! Something went wrong.")
}
