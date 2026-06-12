import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} from '../../api/reservation.api'
import { useFetch } from '../../hooks/useFetch'
import type { RestaurantTable, TableInput } from '../../types/reservation'
import TableFormDialog from '../molecules/TableFormDialog'

function TableManager() {
  const { data, loading, error, refetch } = useFetch(getTables)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<RestaurantTable | null>(null)
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [actionError, setActionError] = useState('')

  const openAdd = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (table: RestaurantTable) => {
    setEditing(table)
    setDialogOpen(true)
  }

  const handleSave = async (input: TableInput) => {
    setSaving(true)
    setActionError('')
    try {
      if (editing) {
        await updateTable(editing.id, input)
      } else {
        await createTable(input)
      }
      setDialogOpen(false)
      refetch()
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Tisch konnte nicht gespeichert werden.',
      )
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    setActionError('')
    try {
      await deleteTable(id)
      refetch()
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Tisch konnte nicht gelöscht werden.',
      )
    } finally {
      setBusyId(null)
    }
  }

  const tables = [...(data ?? [])].sort(
    (a, b) =>
      (a.tableNumber ?? Number.MAX_SAFE_INTEGER) -
        (b.tableNumber ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id),
  )

  return (
    <Box>
      <Button
        variant="contained"
        color="error"
        startIcon={<AddIcon />}
        onClick={openAdd}
        sx={{ mb: 2 }}
      >
        Tisch hinzufügen
      </Button>

      {actionError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionError}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">Tische konnten nicht geladen werden: {error}</Alert>}

      {!loading && !error && tables.length === 0 && (
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Noch keine Tische angelegt.
        </Typography>
      )}

      <Stack spacing={1.5}>
        {tables.map((table, index) => (
          <Box
            key={table.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              p: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Tisch {table.tableNumber ?? index + 1} · {table.numSeats} Plätze
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" onClick={() => openEdit(table)}>
                Bearbeiten
              </Button>
              <Button
                size="small"
                color="error"
                disabled={busyId === table.id}
                onClick={() => handleDelete(table.id)}
              >
                {busyId === table.id ? 'Löschen…' : 'Löschen'}
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>

      <TableFormDialog
        key={editing?.id ?? 'new'}
        open={dialogOpen}
        table={editing}
        saving={saving}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </Box>
  )
}

export default TableManager
