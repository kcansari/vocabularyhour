import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext.js'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Layout from '@/components/Layout.js'
import LoadingButton from '@mui/lab/LoadingButton'

const theme = createTheme()

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error, isSubmitting } = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title={'User Login'}>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              {error && <BasicAlerts error={error} />}
              <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
                <Grid item>
                  Don't have an account?
                  <Link
                    href='/account/register'
                    variant='body2'
                    style={{ textDecoration: 'none' }}
                  >
                    <strong> Sign up</strong>
                  </Link>
                </Grid>
              </Grid>
              <LoadingButton
                type='submit'
                fullWidth
                loading={isSubmitting}
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </LoadingButton>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </Layout>
  )
}

function BasicAlerts({ error }) {
  return (
    <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
      <Alert variant='outlined' severity='error'>
        {error}
      </Alert>
    </Stack>
  )
}
