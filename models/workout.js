const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    title: String;
    notes: String;
})

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;