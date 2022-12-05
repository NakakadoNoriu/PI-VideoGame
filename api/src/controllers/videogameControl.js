const axios = require('axios');
const {API_KEY} = process.env
const {Videogame, Genre} = require('../db');

const getApiInfoVGame = async () => {
  let allgames = []
  try {
    for (let i = 1; i < 6; i++) {
      const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
      const infoGame = apiUrl.data.results.map(e => {
          allgames.push({
          id: e.id,
          name: e.name,
          image: e.background_image,
          release: e.released,
          rating: e.rating,
          platforms: e.platforms.map(p => p.platform.name),
          genre: e.genres.map(el => el.name), 
        })
      })
    }
    // console.log(allgames)
    return allgames;

  } catch (e) {
    console.log('error no se puede traer los juegos: '+ e);
  }
};

const getDbInfo = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      }
    })
  } catch (e) {
    console.log('errorn en getDbIno' + e);
  }
};

const getAllVgame = async () => {
  const apiInfo = await getApiInfoVGame();
  const infoDb = await getDbInfo();
  const infoTotal = apiInfo.concat(infoDb);
  return infoTotal;
};

module.exports = {
  getAllVgame
}

