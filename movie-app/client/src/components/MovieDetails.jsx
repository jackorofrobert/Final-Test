import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await axios(`http://localhost:5000/api/movies/${id}`);
        setMovie(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div>
      <h2>{movie.title} ({movie.year})</h2>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Length:</strong> {movie.length}</p>
      <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
      <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetails;
