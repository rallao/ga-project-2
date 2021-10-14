// Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const seedData = require('./models/seed');
const Workout = require('./models/workout');


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
// Seed Route
app.get('/workouts/seed', async (req, res) => {
    await Workout.deleteMany({});
    await Workout.create(seedData);
    res.redirect('/workouts');
});

// Index Route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/workouts', (req, res) => {
    Workout.find({}, (err, workouts) => {
    res.render('index.ejs', { workouts });
    })
});

// New Route
app.get('/workouts/new', (req, res) => {
    res.render('new.ejs')
});

// Create Route
app.post('/workouts', (req, res) => {
    Workout.create(req.body, (err, createdWorkout) => {
        console.log()
        res.redirect('/workouts');
    });
});
// App Listener
const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log(`Express is listening on port:${PORT}`);
}); 

