const axios = require('axios');
const {Genre} = require('../db');
const {API_KEY} = process.env

const getGenre = async () => {
  try {
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = apiUrl.data.results.map(e=> e.name);

    genres.forEach((e) => {
      Genre.findOrCreate({
        where: {name: e}
      })
    });
    
    const allGenre = await Genre.findAll();
    // console.log(allGenre);
    return allGenre;
    
  } catch (e) {
    console.log(`Ocurrio error en getGenre ${e}`);
  }
};

module.exports = {
  getGenre
}