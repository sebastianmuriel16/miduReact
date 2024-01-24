import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const {
    movies: mappedMovies,
    getMovies,
    loading,
  } = useMovies({ search, sort })
  //el useCallback es para crear la funcion getMovies unaunica vez
  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 500),
    [getMovies]
  )
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }
  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            autoComplete="off"
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="pelicula a buscar"
          />
          <button className="btn" type="submit">
            Buscar
          </button>
          <input
            type="checkbox"
            onChange={handleSort}
            checked={sort}
            name="sort"
          />
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {loading ? <p>buscando...</p> : <Movies movies={mappedMovies} />}
      </main>
    </div>
  )
}

export default App
