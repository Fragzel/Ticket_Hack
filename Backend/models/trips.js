const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    date: { type: Date, required: true },
    price: Number
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;