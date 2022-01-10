import Head from "next/head"
import { useState } from "react"

// We won't do spam protection. Instead, we will just limit our "Inbox" on Notion to 50 messages
// Data to collect for form submission:
// 		1. Name, Email, Message
// 		2. Timestamp on submit

// We should also put LinkedIn and other contact info on this page

export default function Contact() {
	const [formValues, setFormValues] = useState({name: "", email: "", message: ""});

	// change values of formInfo
	const handleChange = (e, field) => {
		setFormValues({...formValues, [field] : e.target.value }); // set formValues to the original and then overwrite one field
	}

	// Send post request to API
	const handleSubmit = async (e) => {
		e.preventDefault();

		// fetch returns a promise
		const send = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submission),
        })
		.then((res) => {
			if(res.status === 401){
				res.json().then( data => setError(data.status))
			}
			else{
				setSuccess(true);
				setFormValues({name: "", email: "", message: ""}); // reset the form on success
			}
		})
		.catch((err) => {
			setError("Sorry, something went wrong. Message failed to send."); 
			console.log(err);
		});
	}

	return (
		<>
			<Head>
				<title>Contact | Oliver Gao</title>
				<meta name="description" content="Contact me" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="md:grid justify-center pt-16 sm:pt-20">
				<div className="">
					<section className="pb-8">
						<h1 className="text-6xl sm:text-6xl font-semibold">Contact me.</h1>
						<p>Send me a message. I'd love to read it!</p>
					</section>

					<form className="mt-8 max-w-md" onSubmit={handleSubmit}>
						<label className="block mb-6">
							Name
							<input
								type="text"
								className="
								bg-transparent
								mt-0
								block
								w-full
								px-0.5
								border-0 border-b-2 border-gray-200
								focus:ring-0 focus:border-black"
								onChange={(e) => handleChange(e, "name")}
								value={formValues.name}
							/>
						</label>
						<label className="block mb-6">
							Email
							<input
								type="email"
								className="
								bg-transparent
								mt-0
								block
								w-full
								px-0.5
								border-0 border-b-2 border-gray-200
								focus:ring-0 focus:border-black"
								onChange={(e) => handleChange(e, "email")}
								value={formValues.email}
							/>
						</label>
						<label className="block mb-6">
							<span className="">Message</span>
							<textarea
								className="
									bg-transparent
									mt-0
									block
									w-full
									px-0.5
									border-0 border-b-2 border-gray-200
									focus:ring-0 focus:border-black"
								rows="3"
								onChange={(e) => handleChange(e, "message")}
								value={formValues.message}
							/>
						</label>
						<button type="submit" className="bg-black text-white px-6 py-2">
							Send
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
