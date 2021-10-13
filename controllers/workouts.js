const express = require('express')
const workoutsRouter = express.Router()

// Index
workoutsRouter.get('/', (req, res) => {
    res.render('shows.ejs');
});

// New

// Create

// Show

module.exports = workoutsRouter