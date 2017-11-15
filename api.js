const request = require('request');
const axios = require('axios');

const getPokemonNameCallback = function(pokeNumber, callback) {
  request.get(`http://pokeapi.co/api/v2/pokemon/${pokeNumber}`, function(error, response, body) {
    if (error) {
      callback(error, null)
    }
    var body = JSON.parse(body);
    callback(null, body.forms[0].name)
  });
}

const getPokemonNamePromise = function(pokeNumber) {
  return axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeNumber}`)
  .then((response) => {
    return response.data.forms[0].name;
  });
}

/* 
Write a function that takes two pokenumbers (1-150)
and a callback and creates a stringified array of the format [{number, name}]
for example, for 11 and 1, it should create the following: 
"[{"number":11,"name":"metapod"},{"number":1,"name":"bulbasaur"}]"
*/

const getTwoPokemonNamesCallback = (num1, num2, callback) => {
  let pokemon = [];
  getPokemonNameCallback(num1, (err, name1) => {
    if(err) {
      callback(err, null);
    } else {
      pokemon.push({name: name1, number: num1});
      getPokemonNameCallback(num2, (err, name2) => {
        if(err) {
          callback(err, null);
        } else {
          pokemon.push({name: name2, number: num2});
          callback(null, JSON.stringify(pokemon));
        }
      });
    }
  });
}

/* 
Write a function that takes two pokenumbers (1-150)
and returns a promise that resolves to a stringified array of the format 
[{number, name}] for example, for 11 and 1, it should create the following: 
"[{"number":11,"name":"metapod"},{"number":1,"name":"bulbasaur"}]"
*/

const getTwoPokemonNamesPromise = (num1, num2) => {
  let pokemon = [];
  return getPokemonNamePromise(num1)
  .then(name1 => {
    pokemon.push({name: name1, number: num1});
    return getPokemonNamePromise(num2)
  })
  .then(name2 => {
    pokemon.push({name: name2, number: num2});
    return JSON.stringify(pokemon);
  });
}

/*
Usage:

getPokemonNamesPromise(1, 11)
.then(jsonthing => console.log('data from promise', jsonthing))
.catch(err => console.log('err from promse', err));

getPokemonNamesCallback(1, 11, (err, jsonthing) => {
  console.log('err from callback', err);
  console.log('data from callback', jsonthing);
});

*/

module.exports = {
  twoPokemonNamesPromise: getTwoPokemonNamesPromise,
  twoPokemonNamesCallback: getTwoPokemonNamesCallback
}



