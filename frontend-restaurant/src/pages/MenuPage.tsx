import Stack from '@mui/material/Stack'
import SectionTitle from '../components/atoms/SectionTitle/SectionTitle'
import MenuList from '../components/organisms/MenuList/MenuList'

function MenuPage() {
  return (
    <Stack spacing={3}>
      <SectionTitle>Speisekarte</SectionTitle>
      <MenuList />
    </Stack>
  )
}

export default MenuPage
