import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MovieList from './components/MovieList';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Database</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={MovieList} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
