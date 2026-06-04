import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Route, Routes } from 'react-router-dom'
import ApiTestPage from '../pages/ApiTestPage'
import HomePlaceholderPage from '../pages/HomePlaceholderPage'

/**
 * Zentrale Routen-Definition der App.
 *
 * In Teil 1 gibt es nur die Startseite und die API-Testseite.
 * In den nächsten Teilen kommen hier weitere Routen dazu:
 * - Teil 2: /login, /register
 * - Teil 3–6: /admin/* (geschützter Admin-Bereich)
 *
 * Person 1 kann ihre eigenen Routen (Menü, Warenkorb, Checkout)
 * einfach als weitere <Route> ergänzen.
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePlaceholderPage />} />
      <Route path="/api-test" element={<ApiTestPage />} />

      {/* Platzhalter bis Teil 2 – wird dort durch die echte Login-Seite ersetzt. */}
      <Route
        path="/login"
        element={
          <Container sx={{ py: 6 }}>
            <Typography variant="h5">Login folgt in Teil 2.</Typography>
          </Container>
        }
      />

      {/* Catch-all: unbekannte Adresse */}
      <Route
        path="*"
        element={
          <Container sx={{ py: 6 }}>
            <Typography variant="h5">Seite nicht gefunden (404).</Typography>
          </Container>
        }
      />
    </Routes>
  )
}
