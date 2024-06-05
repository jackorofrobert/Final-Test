import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const NavBar = ({ onSearch, onSort }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    const handleSort = () => {
        onSort();
    };

    return (
        <nav>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>
                MovieApp
            </Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={handleSort}>
                    Sort by Year
                </button>
                <Link to="/" >Home</Link>
                <Link to="/movies" >Movies</Link>
                <Link to="/login" >Login</Link>
            </div>
        </nav>
    );
};

export default NavBar;
