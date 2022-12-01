import styles from '@/styles/Showcase.module.css'
import Typography from '@mui/material/Typography'

const Showcase = () => {
  return (
    <div className={styles.showcase}>
      <Typography variant='h2' gutterBottom>
        Welcome to the Vocabulary Hour
      </Typography>
      <Typography variant='h6' gutterBottom>
        Create your word collection
      </Typography>
    </div>
  )
}

export default Showcase
