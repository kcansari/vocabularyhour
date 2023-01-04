import Layout from '@/components/Layout.js'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

import AuthContext from '@/context/AuthContext.js'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState, useContext, useEffect } from 'react'

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const validationSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegExp, 'Email is invalid.'),
  })
  .required()

export default function Forgotpassword() {
  const [open, setOpen] = useState(false)

  const { forgotPassword, respondForgotPassword } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    if (data.email) {
      forgotPassword(data.email)
      setOpen(true)
    }
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: '' })
    }
  }, [formState, reset])

  return (
    <Layout title={'Forgot password'}>
      <Container maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={12}
            sx={{ bgcolor: '#EEEEEE', minWidth: 500, height: 300 }}
          >
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
              mt={6}
            >
              <Typography variant='h4' gutterBottom>
                Forgot your password?
              </Typography>
              <Divider
                sx={{
                  borderColor: 'primary.main',
                  border: 1,
                  borderRadius: 1,
                  width: 1 / 2,
                }}
              ></Divider>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='subtitle2' mt={1}>
                  {"we'll " + 'send you a link to reset your password'}
                </Typography>
                <Stack spacing={2} direction='row' mt={2} mb={2}>
                  <TextField
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
                  <Button variant='contained' type='submit'>
                    Send
                  </Button>
                </Stack>
              </form>
              <Collapse in={open}>
                <Alert
                  severity={
                    respondForgotPassword === 'This email address is not found'
                      ? 'error'
                      : 'success'
                  }
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {open && respondForgotPassword}
                </Alert>
              </Collapse>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Layout>
  )
}
