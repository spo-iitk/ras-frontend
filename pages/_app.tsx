import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout_wrapper from '../components/Layouts/Layout_wrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout_wrapper>
      <Component {...pageProps} />
    </Layout_wrapper>
  )
}

export default MyApp
