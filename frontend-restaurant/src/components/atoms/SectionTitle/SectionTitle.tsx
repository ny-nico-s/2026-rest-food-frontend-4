import type { ReactNode } from 'react'
import Typography from '@mui/material/Typography'

type SectionTitleProps = {
  children: ReactNode
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
      {children}
    </Typography>
  )
}

export default SectionTitle
