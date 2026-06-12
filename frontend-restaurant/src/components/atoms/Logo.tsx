import Box from '@mui/material/Box'
import { Link as RouterLink } from 'react-router-dom'
import { PATHS } from '../../routes/paths'
import logo from '../../assets/logo.png'

function Logo() {
  return (
    <Box
      component={RouterLink}
      to={PATHS.home}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Box
        component="img"
        src={logo}
        alt="Rest-Food"
        sx={{
          height: 48,
          width: 48,
          display: 'block',
        }}
      />
    </Box>
  )
}

export default Logo
