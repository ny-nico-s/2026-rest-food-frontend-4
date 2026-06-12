import Typography from '@mui/material/Typography'

interface PriceTagProps {
  value: number
}

export default function PriceTag({ value }: PriceTagProps) {
  return <Typography component="span">{value.toFixed(2)} €</Typography>
}
