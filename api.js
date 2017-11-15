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

/* 
Write a function that takes two pokenumbers (1-150)
and returns a promise that resolves to a stringified array of the format 
[{number, name}] for example, for 11 and 1, it should create the following: 
"[{"number":11,"name":"metapod"},{"number":1,"name":"bulbasaur"}]"
*/


