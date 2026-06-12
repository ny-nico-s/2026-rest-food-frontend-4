import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

export const ALL_CATEGORIES = 'Alle'

type CategoryFilterProps = {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const options = [ALL_CATEGORIES, ...categories]

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {options.map((category) => {
        const active = selected === category
        return (
          <Chip
            key={category}
            label={category}
            color={active ? 'primary' : 'default'}
            variant={active ? 'filled' : 'outlined'}
            onClick={() => onSelect(category)}
          />
        )
      })}
    </Box>
  )
}

export default CategoryFilter
