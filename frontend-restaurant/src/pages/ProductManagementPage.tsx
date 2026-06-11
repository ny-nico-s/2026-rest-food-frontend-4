import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuManager from '../components/organisms/MenuManager/MenuManager'

export default function ProductManagementPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Produktverwaltung
      </Typography>
      <MenuManager />
    </Box>
  )
}
