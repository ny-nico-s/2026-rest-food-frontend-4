import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { getMenu } from '../../api/menu.api'
import { useFetch } from '../../hooks/useFetch'

/**
 * Einfache Testseite, um die API-Anbindung aus Teil 1 zu prüfen.
 *
 * Sie ruft GET /menu auf und zeigt:
 * - einen Ladekreis, während geladen wird,
 * - eine Fehlermeldung, wenn das Backend (noch) nicht läuft,
 * - die Liste der Gerichte, wenn alles klappt.
 *
 * (Die "echte" Speisekarte baut Person 1 – das hier ist nur zur Kontrolle.)
 */
export default function ApiTestPage() {
  const { data, loading, error } = useFetch(getMenu)

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        API-Test: GET /menu
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">
          Konnte die Speisekarte nicht laden: {error}
          <br />
          (Läuft das Backend auf localhost:8080?)
        </Alert>
      )}

      {data && data.length === 0 && (
        <Alert severity="info">
          Verbindung steht – aber es sind noch keine Gerichte angelegt.
        </Alert>
      )}

      {data && data.length > 0 && (
        <>
          <Alert severity="success" sx={{ mb: 2 }}>
            Verbindung erfolgreich – {data.length} Gericht(e) geladen.
          </Alert>
          <List>
            {data.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={`${item.name} – ${item.price.toFixed(2)} €`}
                  secondary={item.category}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  )
}
