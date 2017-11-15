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

const saveOnePokemonCallback = (pokemon, callback) => {
  let p1 = new Pokemon(pokemon);
  p1.save((err, data) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

const saveOnePokemonPromise = (pokemon) => {
  let p1 = new Pokemon(pokemon);
  return p1.save();
}
/*
Write a function called saveTwoPokemon, that takes two objects
representing pokemon and saves them to the database.
*/

const saveTwoPokemonCallback = (pokemon1, pokemon2, callback) => {
  saveOnePokemonCallback(pokemon1, (err, data) => {
    if(err) {
      callback(err);
    } else {
      saveOnePokemonCallback(pokemon2, (err, data) => {
        if(err) {
          callback(err);
        } else {
          callback();
        }
      });
    }
  });
};

const saveTwoPokemonPromise = (pokemon1, pokemon2) => {
  return saveOnePokemonPromise(pokemon1)
  .then(() => {
    return saveOnePokemonPromise(pokemon2)
  });
}

module.exports = {
  twoPokemonPromise: saveTwoPokemonPromise,
  twoPokemonCallback: saveTwoPokemonCallback
}
