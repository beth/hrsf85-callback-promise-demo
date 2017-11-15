// write a function that takes two pokemon numbers
// gets their names from the pokemon api
// then saves them to the database

const save = require('./database.js');
const get = require('./api.js');

get.twoPokemonNamesCallback(1, 11, (err, stringifiedArray) => {
  if(!err) {
    let [poke1, poke2] = JSON.parse(stringifiedArray);
    save.twoPokemonCallback(poke1, poke2, (err) => {
      if(err) {
        console.log('err in terying to get and save pokemon', err);
      } else {
        console.log('callback version saved successfully!');
      }
    })
  }
});

get.twoPokemonNamesPromise(1, 11)
.then(stringifiedArray => {
  let [poke1, poke2] = JSON.parse(stringifiedArray);
  return save.twoPokemonPromise(poke1, poke2)
})
.then(() => console.log('promise version saved successfully!'))
.catch(err => console.log('err in terying to get and save pokemon', err))
