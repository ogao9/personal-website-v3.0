import MetaHead from "../../components/MetaHead";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen} from '@fortawesome/free-solid-svg-icons'

export default function Blog() {
	return (
		<>
			<MetaHead
				title="Oliver Gao | Blog"
				description="Welcome to my blog."
			/>
			
			<div className="pt-16 sm:pt-20 max-w-2xl mx-auto">
				<section className="pb-12">
					<h1 className="text-6xl font-semibold mb-3">
						Oliver's Blog
						<FontAwesomeIcon icon={faPen} className="text-maize ml-6"/>
					</h1>
					<p>Welcome to my cafe. A peaceful place to enjoy a hot cup of tea, enjoy the plants around, and read thoughtful content.</p>
				</section>

				<section>
					Yes
				</section>
			</div>
		</>
	)
}
