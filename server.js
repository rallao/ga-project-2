// Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const seedData = require('./models/seed');
const Workout = require('./models/workout');
const methodOverride = require('method-override');


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
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Mount Routes (INDUCES) //
// Seed Route
app.get('/workouts/seed', async (req, res) => {
    await Workout.deleteMany({});
    await Workout.create(seedData);
    res.redirect('/workouts');
});

// Home Route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// Index Route
app.get('/workouts', (req, res) => {
    Workout.find({}, (err, workouts) => {
    res.render('index.ejs', { workouts });
    })
});

// New Route
app.get('/workouts/new', (req, res) => {
    res.render('new.ejs')
});

// Delete Route
app.delete('/workouts/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id, (err, deletedWorkout) => {
        res.redirect('/workouts');
    });
});

// Update Route
app.put('/workouts/:id', (req, res) => {
    req.body.completed = !!req.body.completed; 
    Workout.findByIdAndUpdate(req.params.id, req.body, (err, workout) => {
        res.redirect(`/workouts/${req.params.id}`);
    }); 
}); 

// Create Route
app.post('/workouts', (req, res) => {
    req.body.completed = !!req.body.completed;
    Workout.create(req.body, (err, workout) => {
        res.redirect('/workouts');
    });
});

// Edit Route
app.get('/workouts/:id/edit', (req, res) => {
    Workout.findById(req.params.id, (err, workout) => {
        res.render('edit.ejs', { workout });
    });
});

// Show route
app.get('/workouts/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        res.render('show.ejs', { workout });
    } catch (error) {
        console.log(error.message)
        res.render('error.ejs');
    }
});

// App Listener
const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log(`Express is listening on port:${PORT}`);
}); 

