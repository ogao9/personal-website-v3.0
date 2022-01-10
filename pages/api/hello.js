

// This function is a request handler
export default function handler(req, res) {
	if(req.method !== 'POST'){
		res.status(405).send({ error: `method ${req.method} not allowed`});
	}



	
}
