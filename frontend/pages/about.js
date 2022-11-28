import Link from 'next/link'
import Layout from '@/components/Layout'

export default function AboutPage() {
  return (
    <Layout title='About Vocabulary Hour'>
      <h1>About</h1>
      <p> This is an app to study new words which you fancy learn</p>
      <p>Versin 1.0.0</p>
      <Link href='/'>Home</Link>
    </Layout>
  )
}
