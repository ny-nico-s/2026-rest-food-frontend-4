import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { getMenu } from '../../../api/menu.api'
import { useFetch } from '../../../hooks/useFetch'
import CategoryFilter, { ALL_CATEGORIES } from '../../molecules/CategoryFilter/CategoryFilter'
import MenuItemCard from '../../molecules/MenuItemCard/MenuItemCard'
import type { MenuItem } from '../../../types/menu'

const GRID_COLUMNS = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: {
    xs: '1fr',
    sm: '1fr 1fr',
    md: '1fr 1fr 1fr',
  },
} as const

function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <Box component="section">
      <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      <Box sx={GRID_COLUMNS}>
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  )
}

function MenuList() {
  const { data, loading, error } = useFetch(getMenu)
  const [selected, setSelected] = useState(ALL_CATEGORIES)

  const items = data ?? []
  const categories = Array.from(new Set(items.map((item) => item.category)))
  const showAll = selected === ALL_CATEGORIES
  const visibleCategories = showAll ? categories : [selected]
  const chefItems = items.filter((item) => item.chefsChoice)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error">
        Die Speisekarte konnte nicht geladen werden: {error}
      </Alert>
    )
  }

  if (items.length === 0) {
    return <Alert severity="info">Es sind noch keine Gerichte verfügbar.</Alert>
  }

  return (
    <Stack spacing={4}>
      <CategoryFilter
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />

      {showAll && chefItems.length > 0 && (
        <MenuSection title="Chef's Choice" items={chefItems} />
      )}

      {visibleCategories.map((category) => {
        const categoryItems = items
          .filter((item) => item.category === category)
          .filter((item) => (showAll ? !item.chefsChoice : true))
          .sort((a, b) => Number(b.chefsChoice) - Number(a.chefsChoice))

        if (categoryItems.length === 0) {
          return null
        }

        return <MenuSection key={category} title={category} items={categoryItems} />
      })}
    </Stack>
  )
}

export default MenuList
