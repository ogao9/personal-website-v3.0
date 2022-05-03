import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addItem("Yurts in Big Sur, California")

// This function is a request handler
export default function handler(req, res) {
	if(req.method !== 'POST'){
		res.status(405).send({ error: `method ${req.method} not allowed`});
	}

	console.log(req.body)
	res.status(200).send(req.body.name)
}
