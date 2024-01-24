import { useState, useEffect, useRef } from 'react'
function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match('hola')) { 
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if (search.length < 3) {
      setError('No se puede buscar una pelicula con menos de 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

export { useSearch }
