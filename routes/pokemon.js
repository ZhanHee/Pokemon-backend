const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');
const path = require('path');


router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route par défaut : redirige vers index.html
router.get('/pageAccueil', (req, res) => {
    res.sendFile(path.join(__dirname, '', '../../pokemon-front/index.html'));
});


router.get('/pokemon/:name', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({name: req.params.name});
        if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json(pokemon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const newPokemon = new Pokemon(req.body);
        const savedPokemon = await newPokemon.save();
        res.status(201).json(savedPokemon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



router.get('/detail/:name', async (req, res) => {
    try {
        const name = req.params.name.toLowerCase();
        const response = await fetch('http://localhost:5000/api/pokemons'); 
        const pokemons = await response.json();

        const pokemon = pokemons.find(p => p.name.toLowerCase() === name);

        if (pokemon) {
            // Send the HTML with the Pokémon data embedded
            res.send(`
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Détails Pokémon</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            margin: 0;
                            padding: 0;
                            background-color: #f7f7f7;
                            color: #333;
                        }
                        h1 {
                            color: #ff0000;
                            margin: 20px 0;
                        }
                        .pokemon-details {
                            margin: 20px auto;
                            width: 300px;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .pokemon-details img {
                            width: 150px;
                            height: 150px;
                        }
                        .pokemon-name {
                            font-size: 20px;
                            margin: 10px 0;
                        }
                        .pokemon-type {
                            font-size: 16px;
                            color: #666;
                        }
                        .back-button {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            background-color: #ff0000;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .back-button:hover {
                            background-color: #cc0000;
                        }
                    </style>
                </head>
                <body>
                    <h1>Détails du Pokémon</h1>
                    <div class="pokemon-details">
                        <img src="${pokemon.image_url}" alt="${pokemon.name}">
                        <div class="pokemon-name">#${String(pokemon.id).padStart(3, '0')} ${pokemon.name}</div>
                        <div class="pokemon-type">Type: ${pokemon.types.join(', ')}</div>
                        <div class="pokemon-abilities">Abilities: ${pokemon.abilities.join(', ')}</div>
                        <div class="pokemon-height">Height: ${pokemon.height} dm</div>
                        <div class="pokemon-weight">Weight: ${pokemon.weight} hg</div>
                        <div class="pokemon-weaknesses">Weaknesses: ${pokemon.weaknesses.join(', ')}</div>
                    </div>
                    <a href="/api/pokemons/pageAccueil" class="back-button">Retour au Pokédex</a>
                </body>
                </html>
            `);
        } else {
            res.status(404).send(`<h1>Pokémon "${name}" not found</h1>`);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        res.status(500).send('<h1>Failed to load Pokémon details</h1>');
    }
});



router.put('/:id', async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json(updatedPokemon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!deletedPokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json({ message: 'Pokemon deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;