import React from 'react';

function MovieCard({ movie, onSelect }) {
  return (
    <div className="MovieCard" onClick={onSelect}>
      <img src={movie.image} alt={movie.name} />
      <h3>{movie.name}</h3>
      <p>{movie.time} min</p> {/* Displaying the movie duration */}
    </div>
  );
}

export default MovieCard;
