import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import DishImage from '../atoms/DishImage'
import ProductDetailDialog from '../organisms/ProductDetailDialog'
import type { MenuItem } from '../../types/menu'

type MenuItemCardProps = {
  item: MenuItem
}

function MenuItemCard({ item }: MenuItemCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea
          onClick={() => setOpen(true)}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <DishImage src={item.imageUrl} alt={item.name} />
            {item.chefsChoice && (
              <Chip
                label="Chef's Choice"
                color="error"
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
              />
            )}
          </Box>

          <CardContent sx={{ flexGrow: 1, width: '100%' }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}
            >
              <Typography variant="h6" component="h3">
                {item.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                {item.price.toFixed(2)} €
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <ProductDetailDialog item={item} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default MenuItemCard
