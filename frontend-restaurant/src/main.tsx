import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { theme } from './theme/theme.ts'

/**
 * Einstiegspunkt der App. Hier werden die globalen Provider gesetzt:
 * - ThemeProvider: stellt das MUI-Theme allen Komponenten zur Verfügung
 * - CssBaseline: setzt Browser-Standardstile zurück (einheitliche Basis)
 * - BrowserRouter: aktiviert das Routing (URLs / Seitenwechsel)
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
