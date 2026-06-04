import { createTheme } from '@mui/material/styles'

/**
 * Zentrales MUI-Theme der App.
 * Aktuell das neutrale MUI-Standard-Theme.
 * Farben/Typografie hier anpassen, damit es überall greift.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

export default theme
