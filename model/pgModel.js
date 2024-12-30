const mongoose = require('mongoose');
const { schema } = require('./userModel'); // Ensure this import is needed

const pgSchema = new mongoose.Schema({
    name: String,
    address: String,
    price: Number,
    amenities: [String],
    images: [String]
});

module.exports = mongoose.model('PG', pgSchema);
