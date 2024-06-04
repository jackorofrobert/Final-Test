import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movieAPI';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies()
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.ID}>
          <h3>{movie.name}</h3>
          <p>{movie.year}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
