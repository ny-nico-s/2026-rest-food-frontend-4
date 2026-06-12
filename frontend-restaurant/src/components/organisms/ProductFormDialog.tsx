import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import FormTextField from '../molecules/FormTextField'
import type { MenuItem, MenuItemInput } from '../../types/menu'

interface ProductFormDialogProps {
  open: boolean
  initialValue: MenuItem | null
  categories?: string[]
  loading?: boolean
  onSubmit: (data: MenuItemInput) => void
  onClose: () => void
}

interface FormState {
  name: string
  description: string
  price: string
  category: string
  imageUrl: string
  chefsChoice: boolean
}

function buildInitialState(item: MenuItem | null): FormState {
  if (!item) {
    return {
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      chefsChoice: false,
    }
  }
  return {
    name: item.name,
    description: item.description,
    price: String(item.price),
    category: item.category,
    imageUrl: item.imageUrl,
    chefsChoice: item.chefsChoice,
  }
}

export default function ProductFormDialog({
  open,
  initialValue,
  categories = [],
  loading = false,
  onSubmit,
  onClose,
}: ProductFormDialogProps) {
  const [form, setForm] = useState<FormState>(() => buildInitialState(initialValue))

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      imageUrl: form.imageUrl,
      chefsChoice: form.chefsChoice,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialValue ? 'Gericht bearbeiten' : 'Neues Gericht'}
        </DialogTitle>
        <DialogContent>
          <FormTextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            autoFocus
          />
          <FormTextField
            label="Beschreibung"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            multiline
            minRows={2}
            required
          />
          <FormTextField
            label="Preis (€)"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <Autocomplete
            freeSolo
            fullWidth
            options={categories}
            value={form.category}
            onChange={(_, newValue) =>
              setForm({ ...form, category: newValue ?? '' })
            }
            onInputChange={(_, newValue) =>
              setForm({ ...form, category: newValue })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategorie"
                margin="normal"
                required
                helperText="Vorhandene Kategorie wählen oder neue eingeben"
              />
            )}
          />
          <FormTextField
            label="Bild-URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.chefsChoice}
                onChange={(e) => setForm({ ...form, chefsChoice: e.target.checked })}
              />
            }
            label="Chef's Choice"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Abbrechen
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Speichern
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
