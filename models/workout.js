// Requiere Deoendencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Schema
const workoutSchema = new Schema ({
    title: { type: String, required:true},
    notes: { type: String, required:false}
}, { timestamps: true});

// Export the model
const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;