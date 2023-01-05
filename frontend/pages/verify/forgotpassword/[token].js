import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import Alert from '@mui/material/Alert'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { styles } from '@/config/registerPageConfig.js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LockResetIcon from '@mui/icons-material/LockReset'
import Avatar from '@mui/material/Avatar'
import { useState, useEffect, useContext } from 'react'
import * as yup from 'yup'

const theme = createTheme()

const validationSchema = yup
  .object({
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

export default function ResetPasswordPage() {
  const router = useRouter()
  const { token } = router.query

  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetPasswordError, setResetPasswordError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const { password } = data
    const res = await fetch(`${API_URL}/api/users/reset-password/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    })
    const backendRes = await res.json()

    if (res.ok) {
      setIsSubmitting(false)
      setResetPasswordError(backendRes.message)
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      setIsSubmitting(false)
      setResetPasswordError(backendRes.message)
    }
  }

  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  return (
    <Layout title={'Reset Password'}>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box sx={styles.box}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockResetIcon sx={{ fontSize: 38 }} />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Reset Password
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
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
              {resetPasswordError && (
                <BasicAlerts
                  error={resetPasswordError}
                  severity={
                    resetPasswordError ===
                    'Your password has been changed successfully'
                      ? 'success'
                      : 'error'
                  }
                />
              )}
              <LoadingButton
                type='submit'
                fullWidth
                loading={isSubmitting}
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  )
}

function BasicAlerts({ error, severity }) {
  return (
    <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
      <Alert variant='outlined' severity={severity}>
        {error}
      </Alert>
    </Stack>
  )
}
