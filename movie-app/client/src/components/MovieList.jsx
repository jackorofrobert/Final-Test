import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import '../styles.css';

const MovieList = ({ searchTerm, sortYear }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/movies');
        setMovies(result.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (sortYear) {
      setMovies((prevMovies) =>
        [...prevMovies].sort((a, b) => a.year - b.year)
      );
    }
  }, [sortYear]);

  const filteredMovies = movies.filter((movie) =>
    movie.name && movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <h2>Movie List</h2>
      {filteredMovies.length > 0 ? (
        <Slider {...settings}>
          {filteredMovies.map(movie => (
            <div key={movie.ID} className="movie">
              <Link to={`/details/${movie.ID}`}>
                <img src={movie.image} alt={movie.name} />
                <h3>{movie.name}</h3>
                <p>{movie.introduce}</p>
                <p>{movie.time} min | {movie.year}</p>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

export default MovieList;
