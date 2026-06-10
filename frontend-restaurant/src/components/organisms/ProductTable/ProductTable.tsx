import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PriceTag from '../../atoms/PriceTag/PriceTag'
import type { MenuItem } from '../../../types/menu'

interface ProductTableProps {
  items: MenuItem[]
  onEdit: (item: MenuItem) => void
  onDelete: (item: MenuItem) => void
}

export default function ProductTable({ items, onEdit, onDelete }: ProductTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Kategorie</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="center">Chef's Choice</TableCell>
            <TableCell align="right">Aktionen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell align="right">
                <PriceTag value={item.price} />
              </TableCell>
              <TableCell align="center">
                {item.chefsChoice ? (
                  <Chip label="Ja" color="secondary" size="small" />
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="Bearbeiten" onClick={() => onEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Löschen"
                  color="error"
                  onClick={() => onDelete(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
