import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import AuthLayout from '../components/templates/AuthLayout/AuthLayout'
import FormTextField from '../components/molecules/FormTextField/FormTextField'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../routes/paths'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login({ username, password })
      navigate(PATHS.home)
    } catch {
      setError('Login fehlgeschlagen. Bitte Benutzername und Passwort prüfen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Login">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}
        <FormTextField
          label="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <FormTextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Wird angemeldet…' : 'Anmelden'}
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Noch kein Konto?{' '}
          <Link component={RouterLink} to={PATHS.register}>
            Registrieren
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
