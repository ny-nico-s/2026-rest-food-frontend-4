import axios from 'axios'

/**
 * Zentrale axios-Instanz für alle Backend-Aufrufe.
 *
 * - baseURL kommt aus der Umgebungsvariable VITE_API_URL (.env),
 *   Standard ist http://localhost:8080 (siehe PDF).
 * - Der Request-Interceptor hängt automatisch den JWT-Token an,
 *   falls ein Nutzer eingeloggt ist (wird in Teil 2 gesetzt).
 * - Der Response-Interceptor behandelt abgelaufene/ungültige Logins (401).
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

/** Schlüssel, unter dem der Login-Token im Browser gespeichert wird. */
export const TOKEN_STORAGE_KEY = 'restaurant_token'

// --- Request: Token automatisch mitsenden -------------------------------
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// --- Response: bei 401 (nicht eingeloggt) zur Login-Seite ----------------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token ist ungültig/abgelaufen -> entfernen und zum Login leiten.
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
