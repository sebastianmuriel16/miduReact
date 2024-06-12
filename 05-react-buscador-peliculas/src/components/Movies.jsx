import PropTypes from "prop-types";
import "./Movies.css";
function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => {
        return (
          <li className="movie" key={movie.id}>
            <img className="image" src={movie.poster} alt={movie.title} />
            <div className="movie-info">
              <span className="title">{movie.title}</span>
              <span className="year">{movie.year}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function NoMoviesResults() {
  return <p>No hay resultados para esta busqueda</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
}

ListOfMovies.propTypes = {
  movies: PropTypes.array,
};

Movies.propTypes = {
  movies: PropTypes.array,
};
