import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export default function CommentPage({ data }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout title={'User verify page'}>
      <Container maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {data.message === 'Email verified successfully' ? (
            <Alert variant='filled' severity='success'>
              {data.message}, please sign in your account
            </Alert>
          ) : (
            <Alert variant='filled' severity='error'>
              {data.message}, please check your verify link
            </Alert>
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ query: { id, token } }) {
  const res = await fetch(`${API_URL}/verify/${id}/${token}`)

  const data = await res.json()

  return {
    props: {
      data: data,
    },
  }
}
