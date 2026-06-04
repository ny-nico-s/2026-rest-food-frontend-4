import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'

function Logo() {
  return (
    <Typography
      variant="h6"
      component={RouterLink}
      to={PATHS.home}
      sx={{
        fontWeight: 700,
        letterSpacing: 1,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      Rest-Food
    </Typography>
  )
}

export default Logo
