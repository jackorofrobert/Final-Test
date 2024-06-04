// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieModal from './movieModal';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get('https://teachingk18.github.io/WF_Test_ver2/data.json')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.ID} className="movie-item" onClick={() => setSelectedMovie(movie)}>
          <img src={movie.image} alt={movie.name} />
          <div className="movie-info">
            <h3>{movie.name}</h3>
            <p>{movie.year}</p>
          </div>
        </div>
      ))}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}

export default MovieList;
