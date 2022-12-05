const initialState = {
  videogames: [],
  genres: [],
  allVideogames: [], //para el soporte que contenga todo;
  detail: [],
  errors:''
}

export default function rootReducer(state=initialState, action){
  switch(action.type){
    case "GET_ALL_GAME":
      return {
        ...state, //para concatenar con el estado anterior;
        videogames: action.payload,
        allVideogames: action.payload
      };
    case "GET_BY_NAME": //get videogames by name

      return{
        ...state,
        videogames: action.payload
      };
    case "GET_ID":  //get videogames by id
      return (action.payload.error ) ? ({...state,errors:action.payload}): ({...state,detail: action.payload});
    case "POST_GAMES": //crear videogame
      return{
        ...state,
      }
    case "FILTER_BY_GENRE": //filtrar por genre
      const allGames = state.allVideogames; //para que agarre el que contiene todo 
      //luego modificar el videogames;
      //solo se modifica el videogames;
      const allGamesGenre = allGames.map(e => ({
        id: e.id,
        image: e.image,
        name: e.name,
        genre: e.genre ? e.genre.map(g => g) : e.genres.map(g => g.name) ,
        rating: e.rating
      }))
      const characFilter = action.payload === "all" ? allGames : allGamesGenre.filter((e) => e.genre.includes(action.payload));
      return{
        ...state,
        videogames: characFilter
      };
    case "FILTER_CREATED": //filtrar created or existing;
      const allGames2 = state.allVideogames;
      const filterCreated = action.payload === "Created" ? allGames2.filter((e) => e.createInDb) : allGames2.filter((e) => !e.createInDb);
      return{
        ...state,
        videogames: action.payload === "all" ? allGames2 : filterCreated
      };
    case "ORDER_BY_NAME": 
      let sortedArr = action.payload === 'asc' ? 
      state.videogames.sort(function(a, b){// ordern de manera ascendente
        if(a.name > b.name){
          return 1;
        }
        if(b.name > a.name){
          return -1;
        }
        return 0
      }) :
      state.videogames.sort(function(a,b){ //ordenar de manera descendente
        if(a.name > b.name){
          return -1;
        }
        if(b.name > a.name){
          return 1;
        }
        return 0;
      })
      return{
        ...state,
        videogames: sortedArr
      }
    case "GET_GENRE": 
      return{
        ...state,
        genres: action.payload
      };
    case "FILTER_RATING":
      const sortMenor = action.payload === "Menor" ? 
      state.videogames.sort(function(a,b){
        return a.rating - b.rating;
      }) : state.videogames.sort(function(a,b){
        return b.rating - a.rating
      });
      return{
        ...state,
        videogames: sortMenor
      }
    
    case "RESETDETAIL":
      return{
        ...state,
        detail: [''],
        errors: ''
      }
    default :
    return {...state};
  }
};
