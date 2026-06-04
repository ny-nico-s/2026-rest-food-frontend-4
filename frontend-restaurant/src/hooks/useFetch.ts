import { useCallback, useEffect, useState } from 'react'

/**
 * Ergebnis des useFetch-Hooks.
 * - data: die geladenen Daten (oder null, solange nichts da ist)
 * - loading: true, während geladen wird
 * - error: Fehlermeldung als Text (oder null)
 * - refetch: Funktion, um die Daten erneut zu laden
 */
export interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Generischer Hook zum Laden von Daten aus dem Backend.
 *
 * Beispiel:
 *   const { data, loading, error, refetch } = useFetch(getMenu)
 *
 * Er kümmert sich um die typischen Zustände (laden / Fehler / fertig),
 * damit nicht jede Seite das selbe useState/useEffect wiederholen muss.
 *
 * @param fetcher Funktion, die ein Promise mit den Daten zurückgibt.
 */
export function useFetch<T>(fetcher: () => Promise<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // useCallback, damit die Ladefunktion stabil bleibt und der
  // useEffect unten nicht in einer Endlosschleife läuft.
  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unbekannter Fehler beim Laden der Daten.',
      )
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    // Beim ersten Anzeigen einmal laden. Der setState-Aufruf in load()
    // ist hier gewollt (typisches Daten-Laden), daher die Lint-Ausnahme.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  return { data, loading, error, refetch: load }
}
