import { searchMovies } from '../Services/Movies'
import { useState, useRef, useMemo, useCallback } from 'react'

function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  //para crear la funcion getMovies una unica vez
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      //tanto en el try como en el catch se ejecuta
      setLoading(false)
    }
  }, [])
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return { movies: sortedMovies, getMovies, loading, error }
}

export { useMovies }
