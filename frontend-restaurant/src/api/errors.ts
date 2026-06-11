import axios from 'axios'

interface BackendError {
  message?: string
  error?: string
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as BackendError | undefined
      if (data?.message) {
        return data.message
      }
      if (data?.error) {
        return data.error
      }
      switch (error.response.status) {
        case 400:
          return 'Ungültige Eingabe. Bitte überprüfe die Felder.'
        case 401:
          return 'Du bist nicht angemeldet. Bitte melde dich erneut an.'
        case 403:
          return 'Dafür fehlt dir die Berechtigung.'
        case 404:
          return 'Der Eintrag wurde nicht gefunden.'
        case 409:
          return 'Der Eintrag steht im Konflikt mit vorhandenen Daten.'
        case 500:
          return 'Serverfehler. Bitte versuche es später erneut.'
        default:
          return `Unerwarteter Fehler (Status ${error.response.status}).`
      }
    }
    if (error.request) {
      return 'Server nicht erreichbar. Läuft das Backend?'
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Unbekannter Fehler.'
}
