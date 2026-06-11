import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import AddIcon from '@mui/icons-material/Add'
import ProductTable from '../ProductTable/ProductTable'
import ProductFormDialog from '../ProductFormDialog/ProductFormDialog'
import ConfirmDialog from '../../molecules/ConfirmDialog/ConfirmDialog'
import { useFetch } from '../../../hooks/useFetch'
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../../../api/menu.api'
import { getErrorMessage } from '../../../api/errors'
import type { MenuItem, MenuItemInput } from '../../../types/menu'

export default function MenuManager() {
  const { data, loading, error, refetch } = useFetch(getMenu)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const categories = data
    ? Array.from(new Set(data.map((item) => item.category))).filter(Boolean)
    : []

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(item: MenuItem) {
    setEditing(item)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  async function handleSubmit(input: MenuItemInput) {
    setSaving(true)
    try {
      if (editing) {
        await updateMenuItem(editing.id, input)
        setMessage('Gericht aktualisiert.')
      } else {
        await createMenuItem(input)
        setMessage('Gericht angelegt.')
      }
      closeForm()
      refetch()
    } catch (err) {
      setMessage(`Speichern fehlgeschlagen: ${getErrorMessage(err)}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return
    }
    setDeleting(true)
    try {
      await deleteMenuItem(deleteTarget.id)
      setMessage('Gericht gelöscht.')
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      setMessage(`Löschen fehlgeschlagen: ${getErrorMessage(err)}`)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Neues Gericht
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error">Konnte die Gerichte nicht laden: {error}</Alert>
      )}
      {data && data.length === 0 && (
        <Alert severity="info">Noch keine Gerichte angelegt.</Alert>
      )}
      {data && data.length > 0 && (
        <ProductTable items={data} onEdit={openEdit} onDelete={setDeleteTarget} />
      )}

      <ProductFormDialog
        key={editing?.id ?? 'new'}
        open={formOpen}
        initialValue={editing}
        categories={categories}
        loading={saving}
        onSubmit={handleSubmit}
        onClose={closeForm}
      />
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Gericht löschen"
        message={deleteTarget ? `„${deleteTarget.name}“ wirklich löschen?` : ''}
        confirmLabel="Löschen"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <Snackbar
        open={message !== null}
        autoHideDuration={4000}
        onClose={() => setMessage(null)}
        message={message ?? ''}
      />
    </Box>
  )
}
