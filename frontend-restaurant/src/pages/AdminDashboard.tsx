import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { Link as RouterLink } from 'react-router-dom'
import MenuManager from '../components/organisms/MenuManager/MenuManager'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../routes/paths'

const CARDS = [
  {
    title: 'Produktverwaltung',
    description: 'Gerichte anlegen, bearbeiten und löschen.',
    to: PATHS.adminProducts,
    icon: <RestaurantMenuIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Bestellübersicht',
    description: 'Bestellungen ansehen und den Status ändern.',
    to: PATHS.adminOrders,
    icon: <ReceiptLongIcon fontSize="large" color="primary" />,
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Willkommen{user ? `, ${user.username}` : ''}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Wähle einen Bereich, um mit der Verwaltung zu starten.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        }}
      >
        {CARDS.map((card) => (
          <Card key={card.to} variant="outlined">
            <CardActionArea component={RouterLink} to={card.to} sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {card.icon}
                <Box>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Menü anpassen
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Gerichte direkt hier anlegen, bearbeiten oder löschen.
      </Typography>
      <MenuManager />
    </Box>
  )
}
