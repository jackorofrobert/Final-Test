import React, { useEffect, useState } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
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
