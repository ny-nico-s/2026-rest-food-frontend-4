import AppRouter from './routes/AppRouter'

/**
 * Wurzel-Komponente der App.
 * Die Provider (Theme, Router) werden in main.tsx gesetzt – hier
 * werden nur die Routen angezeigt.
 */
function App() {
  return <AppRouter />
}

export default App
