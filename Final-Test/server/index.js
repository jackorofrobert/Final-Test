const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000; // Port cho backend

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Thiết lập cho việc lưu trữ tập tin
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Đặt tên file theo timestamp
  }
});

const upload = multer({ storage: storage });

let movies = require('./data.json'); // Đường dẫn tới file JSON với dữ liệu mẫu

app.get('/', (req, res) => {
  res.send('Hello from the movie server!');
});

// API lấy tất cả phim
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// API thêm phim mới
app.post('/api/movies', (req, res) => {
  const movie = req.body;
  movie.ID = movies.length + 1;
  movies.push(movie);
  res.status(201).send(movie);
});

// API cập nhật thông tin phim
app.put('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex(m => m.ID === id);
  if (movieIndex >= 0) {
    movies[movieIndex] = {...movies[movieIndex], ...req.body};
    res.send(movies[movieIndex]);
  } else {
    res.status(404).send('Movie not found');
  }
});

// API xóa phim
app.delete('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter(m => m.ID !== id);
  res.status(204).send();
});

// API tìm kiếm phim theo tên
app.get('/api/movies/search', (req, res) => {
  const searchTerm = req.query.name.toLowerCase();
  const filteredMovies = movies.filter(m => m.name.toLowerCase().includes(searchTerm));
  res.json(filteredMovies);
});

// API lấy danh sách phim theo năm
app.get('/api/movies/sort/year', (req, res) => {
  const sortedMovies = movies.sort((a, b) => a.year - b.year);
  res.json(sortedMovies);
});

// API đăng nhập
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ message: 'Login successful', token: 'fake-jwt-token' });
  } else {
    res.status(401).send('Unauthorized');
  }
});

// API đăng xuất
app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// API tải lên hình ảnh
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ message: 'File uploaded successfully.', path: file.path });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
