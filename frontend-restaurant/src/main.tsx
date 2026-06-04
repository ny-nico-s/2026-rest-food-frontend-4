import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App.tsx'
import theme from './theme/theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ThemeProvider: MUI-Theme global. CssBaseline: einheitliche Browser-Resets. */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* BrowserRouter: aktiviert die Navigation per URL. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
