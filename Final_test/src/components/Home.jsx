import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import MoviePopup from './MoviePopup';
import { fetchMovies } from '../services/api';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movieContainerRef = useRef(null);

  useEffect(() => {
    fetchMovies().then(data => setMovies(data)).catch(error => console.error('Error fetching movies:', error));
  }, []);

  const scrollLeft = () => {
    movieContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' }); // Adjust scroll step size based on your layout
  };

  const scrollRight = () => {
    movieContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' }); // Adjust scroll step size based on your layout
  };

  return (
    <div>
      {movies.length > 4 && (
        <button className="scroll-arrow scroll-left" onClick={scrollLeft}>{'<'}</button>
      )}
      <div className="MovieContainer" ref={movieContainerRef}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onSelect={() => setSelectedMovie(movie)} />
        ))}
      </div>
      {movies.length > 4 && (
        <button className="scroll-arrow scroll-right" onClick={scrollRight}>{'>'}</button>
      )}
      {selectedMovie && (
        <MoviePopup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default Home;
