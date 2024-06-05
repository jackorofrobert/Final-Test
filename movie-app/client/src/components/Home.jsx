import React from 'react';
import '../styles.css';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to MovieApp</h1>
            <p>Explore a vast collection of movies.</p>
            <p>Discover movies, watch trailers, and find showtimes near you.</p>
            <img src="https://via.placeholder.com/600x400" alt="Movie Banner" style={{ marginTop: '20px', borderRadius: '10px' }} />
        </div>
    );
};

export default Home;
