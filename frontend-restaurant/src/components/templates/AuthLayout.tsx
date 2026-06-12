import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  children: ReactNode
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {title}
          </Typography>
          {children}
        </Paper>
      </Container>
    </Box>
  )
}
