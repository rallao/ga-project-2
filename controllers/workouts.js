const express = require('express')
const workoutsRouter = express.Router()

// Index
workoutsRouter.get('/', (req, res) => {
    res.render('shows.ejs');
});

// New
workoutsRouter.get('/new', (req, res) => {
    res.render('new.ejs')
});

// Create

// Show

module.exports = workoutsRouter