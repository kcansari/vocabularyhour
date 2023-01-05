import * as React from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { styles } from '@/config/registerPageConfig.js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Layout from '@/components/Layout.js'
import AuthContext from '@/context/AuthContext.js'
import { useState, useEffect, useContext } from 'react'
import * as yup from 'yup'

const theme = createTheme()

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const validationSchema = yup
  .object({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegExp, 'Email is invalid.'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required()

export default function SignIn() {
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)

  const { registerUser, registerError, isSubmitting } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    registerUser(data)
  }

  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  return (
    <Layout title={'Register Page'}>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box sx={styles.box}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign Up
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='email'
                {...register('username')}
                error={errors.username ? true : false}
                helperText={errors.username?.message}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                {...register('email')}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='password'
                label='Password'
                name='password'
                type={passwordVisibility ? 'text' : 'password'}
                autoComplete='password'
                {...register('password')}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {' '}
                      <IconButton onClick={handleClickShowPassword} edge='end'>
                        {passwordVisibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='confirmPassword'
                label='Confirm Password'
                name='confirmPassword'
                type={passwordVisibility ? 'text' : 'password'}
                autoComplete='confirmPassword'
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword?.message}
              />
              {registerError && <BasicAlerts error={registerError} />}
              <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
                <Grid item>
                  Already have an account?
                  <Link
                    href='/account/login'
                    variant='body2'
                    style={{ textDecoration: 'none' }}
                  >
                    <strong> Sign in</strong>
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
                Sign Up
              </LoadingButton>
            </Box>
          </Box>
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
