import Link from '@mui/material/Link'
import styles from '@/styles/Footer.module.css'
import Typography from '@mui/material/Typography'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography variant='subtitle1' gutterBottom>
        Copyright &copy; Vocabulary Hour {new Date().getFullYear()}
      </Typography>

      <Typography variant='subtitle1' gutterBottom>
        <Link href={'/about'} style={{ textDecoration: 'none' }}>
          About This Project
        </Link>
      </Typography>
    </footer>
  )
}
