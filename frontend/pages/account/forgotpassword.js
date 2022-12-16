import Layout from '@/components/Layout.js'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function Forgotpassword() {
  return (
    <Layout title={'Forgot password'}>
      <Box
        justify='center'
        alignItems={'center'}
        display='flex'
        sx={{ display: 'grid' }}
      >
        <Paper elevation={12} sx={{ bgcolor: '#1C315E' }}>
          Forgot my password
        </Paper>
      </Box>
    </Layout>
  )
}
