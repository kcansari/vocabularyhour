import React from 'react'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'
import Link from 'next/link'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function NotFoundPage() {
  return (
    <Layout title={'Page Not Found'}>
      <div className={styles.error}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Typography variant='h3'>
            {' '}
            <strong>404 not found</strong>
          </Typography>
          <Alert severity='error'>
            {/* <AlertTitle>404</AlertTitle> */}
            Sorry, there is nothing here - {''}
            <strong>
              <Link href={'/'} style={{ textDecoration: 'none' }}>
                Go Back Home
              </Link>
            </strong>
          </Alert>
        </Stack>
      </div>
    </Layout>
  )
}
