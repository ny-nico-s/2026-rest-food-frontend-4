import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import AuthLayout from '../templates/AuthLayout'
import FormTextField from '../molecules/FormTextField'
import { useAuth } from '../../hooks/useAuth'
import { PATHS } from '../../routes/paths'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein.')
      return
    }
    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.')
      return
    }

    setLoading(true)
    try {
      await register({ username, password })
      navigate(PATHS.login)
    } catch {
      setError('Registrierung fehlgeschlagen. Bitte später erneut versuchen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Registrieren">
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
        <FormTextField
          label="Passwort bestätigen"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'Wird registriert…' : 'Konto erstellen'}
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Schon ein Konto?{' '}
          <Link component={RouterLink} to={PATHS.login}>
            Anmelden
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
