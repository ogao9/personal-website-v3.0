import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'
config.autoAddCss = false


function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider defaultTheme="dark" attribute="class">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	)
}

export default MyApp
