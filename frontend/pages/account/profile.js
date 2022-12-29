import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useState } from 'react'

import React from 'react'

const Profile = ({ user, token }) => {
  const [linearProgress, setLinearProgress] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLinearProgress(true)
    const backendRes = await fetch(`${API_URL}/api/users/resend/${user._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    await backendRes.json()
    if (backendRes.ok) {
      console.log('new link has sent', { backendRes })
      setLinearProgress(false)
    } else {
      console.log('there is an error')
      setLinearProgress(false)
    }
  }

  return (
    <Layout title={'User Profile'}>
      {user.verified ? (
        'profile'
      ) : (
        <Container maxWidth='xs'>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Alert severity='warning'>
              <AlertTitle>Verify your account</AlertTitle>
              Check your mailbox,if there is no message —
              <Button
                onClick={submitHandler}
                type='submit'
                variant='text'
                size='small'
              >
                Resend
              </Button>
              {linearProgress && <LinearProgress />}
            </Alert>
          </Box>
        </Container>
      )}
    </Layout>
  )
}

export default Profile

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/api/users/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await res.json()

  return {
    props: {
      user,
      token,
    },
  }
}
