require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./src/db');
const movieRoutes = require('./routes/movieRoute');
const userRoutes = require('./routes/users'); 

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api', userRoutes);

app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
