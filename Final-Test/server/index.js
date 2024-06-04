const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

let movies = [];

axios.get('https://teachingk18.github.io/WF_Test_ver2/data.json')
  .then(response => {
    movies = response.data;
  })
  .catch(error => console.error('Failed to load movies:', error));

app.get('/', (req, res) => {
  res.send('Hello from the movie server!');
});

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.post('/api/movies', (req, res) => {
  const movie = req.body;
  movie.ID = movies.length + 1;
  movies.push(movie);
  res.status(201).send(movie);
});

app.put('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex(m => m.ID === id);
  if (movieIndex >= 0) {
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    res.send(movies[movieIndex]);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.delete('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter(m => m.ID !== id);
  res.status(204).send();
});

app.get('/api/movies/search', (req, res) => {
  const searchTerm = req.query.name.toLowerCase();
  const filteredMovies = movies.filter(m => m.name.toLowerCase().includes(searchTerm));
  res.json(filteredMovies);
});

app.get('/api/movies/sort/year', (req, res) => {
  const sortedMovies = movies.sort((a, b) => a.year - b.year);
  res.json(sortedMovies);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ message: 'Login successful', token: 'fake-jwt-token' });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
  } else {
    res.json({ message: 'File uploaded successfully.', path: file.path });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});