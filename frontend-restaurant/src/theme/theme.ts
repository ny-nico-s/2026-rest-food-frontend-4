import { createTheme } from '@mui/material/styles'

/**
 * Zentrales MUI-Theme für die ganze App.
 *
 * Hier werden Farben, Schrift und Form-Defaults definiert, damit alle
 * Komponenten einheitlich aussehen. Die Farben sind als warme
 * Restaurant-Palette gewählt und können später an das Figma-Mockup
 * angepasst werden – einfach die Werte unten ändern.
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: '#b23a2e', // warmes Rot (Restaurant)
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e0a458', // goldenes Akzentgelb
    },
    background: {
      default: '#faf7f2', // leichtes Creme
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, system-ui, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    button: { textTransform: 'none' }, // keine GROSSBUCHSTABEN auf Buttons
  },
})
