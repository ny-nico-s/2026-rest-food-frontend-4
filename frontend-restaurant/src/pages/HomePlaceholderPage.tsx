import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

/**
 * Vorläufige Startseite.
 *
 * Die richtige Home-Seite (Header/Footer/Hero/Menü) baut Person 1.
 * Diese Platzhalter-Seite gibt es nur, damit der Router etwas anzeigt
 * und man schnell zu den Seiten von Person 2 navigieren kann.
 */
export default function HomePlaceholderPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Restaurant-Frontend
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Startseite (wird von Person 1 gebaut). Schnellzugriff:
      </Typography>
      <Stack spacing={2} direction="column" sx={{ maxWidth: 260, mx: 'auto' }}>
        <Button variant="outlined" component={RouterLink} to="/api-test">
          API-Test (Teil 1)
        </Button>
        <Button variant="contained" component={RouterLink} to="/login">
          Login (Teil 2)
        </Button>
      </Stack>
    </Container>
  )
}
