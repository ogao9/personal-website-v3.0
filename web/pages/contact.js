import { useState } from "react"
import MetaHead from "../components/MetaHead";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareEnvelope, faSpinner} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Contact() {
	return (
		<>
			<MetaHead
				title="Contact Me"
				description="Send me a message to contact me."
			/>

			<div className="pt-16 sm:pt-20">
				<h1 className="text-5xl font-semibold mb-6">
					Contact Me
					{/* <FontAwesomeIcon icon={faPaperPlane} size="sm" className="ml-4 text-maize"/> */}
				</h1>

				<section className="pb-12 pl-1">
					<a href="https://www.linkedin.com/in/oliver-gao/" target="_blank" rel="noreferrer" className="block font-semibold text-[#007dbe] text-xl mb-2">
						<FontAwesomeIcon icon={faLinkedin} size="lg" className="mr-2" />LinkedIn
					</a>
					<a href="mailto:ogao@umich.edu" target="_blank" rel="noreferrer" className="block font-semibold text-red-500 text-xl">
						<FontAwesomeIcon icon={faSquareEnvelope} size="lg" className="mr-2"/>Email
					</a>

					{/* <h2 className="text-2xl font-semibold pt-12 mb-4 ">Send me a message</h2> */}
					<ContactForm/>
				</section>
			</div>
		</>
	)
}

// We won't do spam protection. Instead, we will just limit our "Inbox" on Notion to 50 messages
const ContactForm = () => {
	const [formValues, setFormValues] = useState({name: "", email: "", message: ""});

	const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading ] = useState(false);

	// update state of formValues
	const handleChange = (e, field) => {
		setFormValues({...formValues, [field] : e.target.value }); // set formValues to the original and then overwrite one field
	}

	// Send POST request to API
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
        setSuccess(false);
        setLoading(true);

		//fetch returns a promise
		const send = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        })
		.then((res) => {
			if(res.status === 201){
				setSuccess(true);
				setFormValues({name: "", email: "", message: ""}); // reset the form on success
			}
			else if(res.status == 403){
				setError("Inbox is full. Please try again later.")
			}
			else{
				setError("Sorry, something went wrong. Message failed to send.")
			}
		})
		.catch((err) => {
			setError("Sorry, something went wrong. Message failed to send."); 
		});

		setTimeout(() => { setLoading(false); }, 500); // make sure spinner is visible for long enough
	}

	return(
		<form className="min-w-[320px] sm:min-w-[384px] max-w-lg mt-12" onSubmit={handleSubmit}>
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
					required
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
					required
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
					required
				/>
			</label>

			<button 
				type="submit" 
				className="flex justify-center w-20 h-10 bg-black text-white dark:bg-gray-800 hover:opacity-80 px-5 py-2 mt-4"
				disabled={loading}
			>
				{loading ? <FontAwesomeIcon icon={faSpinner} className="w-5 animate-spin"/> : <span>Send</span>}
			</button>

			{success && 
				<div className="bg-green-100 dark:bg-green-800 text-black-text border-2 border-green-700 rounded px-3 py-2 mt-2 animate-toast">
					<b>Success!</b> Your message was sent!
				</div> 
			}

			{error &&
				<div className="bg-red-100 dark:bg-red-800 text-black-text border-2 border-red-700 rounded px-3 py-2 mt-2 animate-toast">
					<b>Error!</b> {error}
				</div>
			}
		</form>
	)
}