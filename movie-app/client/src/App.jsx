import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Login from './components/Login';
// import NotFound from './components/NotFound';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortYear, setSortYear] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = () => {
    setSortYear(!sortYear);
  };

  return (
    <Router>
      <div>
        <NavBar onSearch={handleSearch} onSort={handleSort} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList searchTerm={searchTerm} sortYear={sortYear} />} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
