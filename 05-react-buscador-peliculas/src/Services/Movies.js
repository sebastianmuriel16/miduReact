const apikey = '4a3b711b'

async function searchMovies({ search }) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apikey}&s=${search}`
    )
    const data = await response.json()
    const movies = data.Search
    return movies?.map((movie) => {
      //esto es una buena practica por si acaso cambia la estructura de la api
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }
    })
  } catch (error) {
    throw new Error('No se encontraron resultados')
  }
}

export { searchMovies }
