import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import DishImage from '../../atoms/DishImage/DishImage'
import type { MenuItem } from '../../../types/menu'

type ProductDetailDialogProps = {
  item: MenuItem
  open: boolean
  onClose: () => void
}

function ProductDetailDialog({ item, open, onClose }: ProductDetailDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        {item.name}
        <IconButton
          onClick={onClose}
          aria-label="Schließen"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ borderRadius: 1, overflow: 'hidden', mb: 2 }}>
          <DishImage src={item.imageUrl} alt={item.name} height={240} />
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={item.category} variant="outlined" size="small" />
          {item.chefsChoice && (
            <Chip label="Chef's Choice" color="error" size="small" />
          )}
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {item.price.toFixed(2)} €
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {item.description}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailDialog
