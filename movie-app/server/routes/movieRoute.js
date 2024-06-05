const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); // Model Movie

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        ID: req.body.ID,
        name: req.body.name,
        time: req.body.time,
        year: req.body.year,
        image: req.body.image,
        introduce: req.body.introduce
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a movie by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        await movie.remove();
        res.json({ message: 'Deleted Movie' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
