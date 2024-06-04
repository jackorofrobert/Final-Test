import React from 'react';
import MovieList from './components/MovieList';
import './App.css'; // Import specific styles for App
import './index.css'; // Import global styles

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Movie UI</h1>
      </header>
      <MovieList />
    </div>
  );
}

export default App;
