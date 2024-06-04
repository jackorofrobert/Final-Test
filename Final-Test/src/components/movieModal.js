// src/components/MovieModal.js
import React from 'react';

function MovieModal({ movie, onClose }) {
  return (
    <div className="movie-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{movie.name}</h2>
        <p>{movie.introduce}</p>
        <button>Play Movie</button>
      </div>
    </div>
  );
}

export default MovieModal;
