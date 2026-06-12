import Stack from '@mui/material/Stack'
import SectionTitle from '../atoms/SectionTitle'
import MenuList from '../organisms/MenuList'

function MenuPage() {
  return (
    <Stack spacing={3}>
      <SectionTitle>Speisekarte</SectionTitle>
      <MenuList />
    </Stack>
  )
}

export default MenuPage
