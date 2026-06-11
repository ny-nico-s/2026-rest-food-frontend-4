import axios from 'axios'

interface FieldError {
  field?: string
  defaultMessage?: string
  message?: string
}

interface BackendError {
  message?: string
  error?: string
  detail?: string
  title?: string
  errors?: FieldError[] | Record<string, string>
  fieldErrors?: FieldError[] | Record<string, string>
}

function formatFieldErrors(
  errors: FieldError[] | Record<string, string>,
): string | null {
  if (Array.isArray(errors)) {
    const parts = errors
      .map((entry) => {
        const text = entry.defaultMessage ?? entry.message
        if (entry.field && text) {
          return `${entry.field}: ${text}`
        }
        return text ?? entry.field ?? null
      })
      .filter((part): part is string => Boolean(part))
    return parts.length > 0 ? parts.join('; ') : null
  }
  const parts = Object.entries(errors).map(
    ([field, text]) => `${field}: ${text}`,
  )
  return parts.length > 0 ? parts.join('; ') : null
}

function statusText(status: number): string {
  switch (status) {
    case 400:
      return 'Ungültige Eingabe'
    case 401:
      return 'Nicht angemeldet'
    case 403:
      return 'Keine Berechtigung'
    case 404:
      return 'Nicht gefunden'
    case 409:
      return 'Konflikt mit vorhandenen Daten'
    case 422:
      return 'Eingabe konnte nicht verarbeitet werden'
    case 500:
      return 'Serverfehler'
    case 502:
      return 'Server-Gateway-Fehler'
    case 503:
      return 'Dienst nicht verfügbar'
    default:
      return `Fehler ${status}`
  }
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const response = error.response
    if (response) {
      const data = response.data as BackendError | string | undefined
      const details: string[] = []

      if (typeof data === 'string') {
        if (data.trim()) {
          details.push(data.trim())
        }
      } else if (data) {
        const fieldErrors = data.errors ?? data.fieldErrors
        if (fieldErrors) {
          const formatted = formatFieldErrors(fieldErrors)
          if (formatted) {
            details.push(formatted)
          }
        }
        const message = data.detail ?? data.message ?? data.title ?? data.error
        if (message && !details.includes(message)) {
          details.push(message)
        }
      }

      const prefix = `${statusText(response.status)} (Status ${response.status})`
      return details.length > 0 ? `${prefix}: ${details.join(' — ')}` : prefix
    }
    if (error.code === 'ECONNABORTED') {
      return 'Zeitüberschreitung: Der Server hat nicht rechtzeitig geantwortet.'
    }
    if (error.request) {
      return 'Server nicht erreichbar. Läuft das Backend auf dem erwarteten Port?'
    }
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Unbekannter Fehler.'
}
