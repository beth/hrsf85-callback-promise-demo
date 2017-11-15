const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/poke');

var pokeSchema = mongoose.Schema({
  name: String,
  number: Number
});

var Pokemon = mongoose.model('Pokemon', pokeSchema);

/*
Write a function called saveOnePokemon, that takes an object
representing a pokemon and it to the database.
*/

/*
Write a function called saveTwoPokemon, that takes two objects
representing pokemon and saves them to the database.
*/
