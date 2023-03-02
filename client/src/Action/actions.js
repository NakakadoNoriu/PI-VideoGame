import axios from 'axios';


export const getAllGames = () => {
  return async function(dispatch) {
    try {
      const dataUrl = await axios.get('http://localhost:3001/videogame');
      const infoGame = dataUrl.data
      return dispatch({type:"GET_ALL_GAME", payload: infoGame});
    } catch (e) {
      console.log(e)
    }
  };
};
//get videogames by name:
export const getNameVideogame = (name) => {
  return async function(dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/videogame?name=${name}`);
      return dispatch({type: "GET_BY_NAME", payload: json.data })
    } catch (e) {
      console.log(`ocurrio un error: ${e}`);
    }
  }
};

export const getDetail = (id) => {
  return async function(dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/videogame/${id}`);
      return dispatch({ type: "GET_ID", payload: json.data})
    } catch (e) {
      return dispatch({type: "GET_ID", payload: {error:e.message}})
    }
  }
};

export const postVideogames = (payload) => {
  console.log('se esta dispachando');
  console.log(payload);
  return async function(){
    try {
      var json = await axios.post('http://localhost:3001/videogame',payload)
      console.log("se dispatcha");
      return json
    } catch (e) {
      console.log(`Error en el dispatch de postGames: ${e}`)
    }
  }
}

//filtros por caracteristicas: TODO LO DE LOGICA NO HACER EN ACTION!!!
export const filterByGenre = (payload) => {
  console.log(payload);
  return{
    type: 'FILTER_BY_GENRE',
    payload
  }
};

//traer todo tipo de genre:
export const getAllGenre = () => {
  return async function(dispatch){
    try {
      const urlGenre = await axios.get('http://localhost:3001/genre');
      const genreData = urlGenre.data;
      return dispatch({type:"GET_GENRE",payload: genreData});
    } catch (e) {
      console.log(`ocurrio un error en dispatch genre: ${e}`);
    }
  };
};


//filter existing and created:
export const filterCreateOrExist = (payload) => {
  console.log(payload);
  return{
    type: "FILTER_CREATED",
    payload
  }
};

export const filterOrderByName = (payload) => {
  return{
    type: "ORDER_BY_NAME",
    payload
  }
};

export const filterByRating = (payload) => {//FALTA HACER EL REDUCER...!!!
  return{
    type: "FILTER_RATING",
    payload
  }
};

export const resetDetail = () => {
  return{
    type: "RESETDETAIL"
  }
};








