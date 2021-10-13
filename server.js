// Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexController = require('./controllers/index.js')
const workoutsController = require('./controllers/workouts.js')

// Initialize App
const app = express();

// Configure App Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;


// Connect to MongoDB
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));


// Mount Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

// Mount Routes
// Index Route
app.use('/', indexController);
app.use('/workouts', workoutsController);

// App Listener
const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log(`Express is listening on port:${PORT}`);
}); 
