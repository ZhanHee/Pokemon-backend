const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: Number, required: true },
    description: { type: String },
    image_url: {type: String},
});

module.exports = mongoose.model('Pokemon', PokemonSchema);