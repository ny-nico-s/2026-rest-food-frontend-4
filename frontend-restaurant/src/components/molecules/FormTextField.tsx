import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'

export default function FormTextField(props: TextFieldProps) {
  return <TextField fullWidth margin="normal" {...props} />
}
