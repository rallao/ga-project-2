// Requiere Deoendencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Schema
const workoutSchema = new Schema ({
    title: { type: String, required:true},
    // date: { type: Date, required:true }, // not working properly
    minutes: { type: Number },
    miles: { type: Number},
    instensity: { type: String },
    location: { type: String },
    notes: { type: String }
}, { timestamps: true});

// Export the model
const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;