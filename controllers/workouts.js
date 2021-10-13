const express = require('express')
const workoutsRouter = express.Router()

workoutsRouter.get('/workouts', (req, res) => {
    res.render('shows.ejs');
});

module.exports = workoutsRouter