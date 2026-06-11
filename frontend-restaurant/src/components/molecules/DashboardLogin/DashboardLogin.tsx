import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle'

const DASHBOARD_PASSWORD = 'admin123'

type DashboardLoginProps = {
  onSuccess: () => void
}

function DashboardLogin({ onSuccess }: DashboardLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password === DASHBOARD_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 360 }}>
      <Stack spacing={3}>
        <SectionTitle>Anmeldung</SectionTitle>
        {error && <Alert severity="error">Falsches Passwort.</Alert>}
        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          autoFocus
          required
        />
        <Button type="submit" variant="contained" color="error" size="large">
          Anmelden
        </Button>
      </Stack>
    </Box>
  )
}

export default DashboardLogin
