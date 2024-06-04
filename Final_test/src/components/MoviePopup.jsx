import React from 'react';
import '../css/MoviePopup.css';

function MoviePopup({ movie, onClose }) {
    return (
        <div className="MoviePopup">
            <div className="MoviePopup-content">
                <img src={movie.image} alt={movie.name} className="MoviePopup-image" />
                <div className="MoviePopup-details">
                    <button className="MoviePopup-close" onClick={onClose}>×</button>
                    <h2>{movie.name}</h2>
                    <p>{movie.time} min - {movie.year}</p>
                    <p>{movie.introduce}</p>
                    <button className="MoviePopup-play">Play Movie</button>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;
