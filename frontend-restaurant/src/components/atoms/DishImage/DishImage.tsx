import { useState } from 'react'
import Box from '@mui/material/Box'
import RestaurantIcon from '@mui/icons-material/Restaurant'

type DishImageProps = {
  src?: string
  alt: string
  height?: number
}

function DishImage({ src, alt, height = 180 }: DishImageProps) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  if (showPlaceholder) {
    return (
      <Box
        sx={{
          height,
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RestaurantIcon sx={{ fontSize: 48, color: 'grey.500' }} />
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      sx={{ height, width: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}

export default DishImage
