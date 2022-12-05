const {Genre, Videogame} = require('../db');
const {getGenre} = require('./genreControl');
const {getAllVgame} = require('./videogameControl');


const getVideoGames = async (req, res) => {
  const {name} = req.query;
  try {
    let allGames = await getAllVgame();
    if(name){
      let gameName = await allGames.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
      gameName ? 
      res.send(gameName) : res.status(404).send(`No existe un juego con el nombre de: ${name}`);
    }else{
      res.send(allGames);
    };
  } catch (e) {
    res.send(`surgio un error en ruta get games: ${e}`);
  }
};

//videogames con id:
const getGameId = async (req, res) => {
  const {id} = req.params;
  try {
    const videogamesTotal = await getAllVgame();
    if(id){
      const gameId = await videogamesTotal.filter(e => e.id == id);
      gameId.length ?
      res.json(gameId) : 
      res.status(404).send(`No se encuentra el juego con el id`);
    }
  } catch (e) {
    res.send(`surgio un error en la busqueda con id: ${e}`);
  }
};

//get de genre: 
const getGenreAll = async(req, res) => {
  try {
    const allGenre = await getGenre();
    res.send(allGenre);
  } catch (e) {
    res.send(`ocurrio un error en getGenreAll: ${e}`);
  }
};

//post video games:
const postGame = async(req, res) => {
  const {name, description, image, release, rating, platforms,createInDb, genres} = req.body;
  try {
    let createGame = await Videogame.create({
      name,
      description,
      image,
      release,
      rating,
      platforms,
      createInDb,
    });
    let genreDb = await Genre.findAll({where: {name: genres}})
    createGame.addGenre(genreDb);

    res.send('Juego creado Perfectamente');
    
  } catch (e) {
    res.send(`Ocurrio un error al crear un nuevo juego: ${e}`);
  };
}


module.exports = {
  getVideoGames,
  getGameId,
  getGenreAll,
  postGame
}