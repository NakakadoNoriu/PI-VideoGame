import React, { useEffect, useState} from "react";
import Navbar from "../NavBar/NavBar";
import {useDispatch,useSelector} from 'react-redux'
import { getAllGames, getAllGenre,filterByGenre, filterCreateOrExist, filterOrderByName, filterByRating } from "../../Action/actions";
import Games from "../Games/Games";
import Paginado from '../Paginado/Paginado';
import s from './home.module.css'

export default function Home(){
  const dispatch = useDispatch()

  //traer los estados de reducer
  const videogame = useSelector(state => state.videogames); //me trae del reducer todo los videogames
  const allGenre = useSelector(state => state.genres);

  //estado local filtrar
  const [orden, setOrden] = useState(''); //setear para el ordenamiento de albetico
  const [currentPage, setCurrentPage] = useState(1) //para pagina actual 
  const [gamesPerPage, setGamesPerPage] = useState(15) //cantidad de games por pagina
  const indexOfLastGames = currentPage * gamesPerPage  //15 = cantidad de videogames por pagina
  const indexOfFirstGames = indexOfLastGames - gamesPerPage //0 = indice del primer videogames 
  const currentVideogames =  videogame.slice(indexOfFirstGames, indexOfLastGames) //guarda todo los videogames que voy a tener en cada pagina

  //
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber) //setear la pagina en ese numero de pagina
  };

  const handleResetPage = (e) => {
    e.preventDefault();
    dispatch(getAllGames());
  }

  useEffect(() => {
    dispatch(getAllGames())
    dispatch(getAllGenre())
  },[dispatch]);


  const handleFilterGenre = (e) => {
    e.preventDefault();
    if(e.target.value === "all"){
      dispatch(getAllGames());
    }else{
      dispatch(filterByGenre(e.target.value));
      setCurrentPage(1)
    }
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    if(e.target.value ==='all'){
      dispatch(getAllGames());
    }else{
      dispatch(filterCreateOrExist(e.target.value));
      setCurrentPage(1);
    }
  };

  const handleFilterMenor = (e) => {
    e.preventDefault();
    dispatch(filterByRating(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  const handleSort = (e) => {
    // e.preventDefault();
    dispatch(filterOrderByName(e.target.value))
    setOrden(`Ordenado ${e.target.value}`)
  }


  if(videogame.length){
    return(
      <div className={s.containerall}>
        <div >
          <Navbar setCurrentPage={setCurrentPage}/>
          <div className={s.containerbuttonreset}>
            <button className={s.buttonreset} onClick={handleResetPage}>Reset page</button>
          </div>
          <br />
          <div className={s.containerorder}>
            <div className={s.containeralfa}>
              <select className={s.selectasc} onChange={(e) => handleSort(e)}>
                <option >Orden - Alfabetic</option>
                <option className={s.ascdescop} value="asc">A - Z</option>
                <option className={s.ascdescop} value="desc">Z - A</option>
              </select>
            </div>

            <div className={s.containermayor}>
              <select className={s.selectasc} onChange={handleFilterMenor}>
                <option >Orden-Rating</option>
                <option value="Mayor">bigger - smaller</option>
                <option value="Menor">smaller - bigger</option>
              </select>
            </div>

            <div className={s.containergenre}>
              <select className={s.selectasc} onChange={(e) => handleFilterGenre(e)}>
                <option value=''>Genre</option>
                <option value="all">All</option>
                {allGenre.map((genre, i) => 
                  <option key={i}>{genre.name}</option>
                )}
                </select>
            </div>

            <div className={s.containercreate}>
              <select className={s.selectasc} onChange={(e) => handleFilterCreated(e)}>
                <option value="all">All</option>
                <option value="Created">Created</option>
                <option value="Existing">Existing</option>
              </select>
            </div>
            
          </div>
          <div className={s.containerpaginado}>
            <Paginado gamesPerPage={gamesPerPage} videogame={videogame.length} paginado={paginado}/>
          </div>
          <br />
          {
            currentVideogames.map((games) => <Games key={games.id} id={games.id} name={games.name} image={games.image ? games.image: 'https://intenta.digital/wp-content/uploads/2022/03/future-of-gaming.jpg'} genre={games.genre?games.genre + ' ' : games.genres.map(e => e.name) + ' '} rating={games.rating} />)
          }
        </div>
      </div>
      
    )
  }else if(!videogame.length){
    return(
      <div className={s.containerloading}>
        <div className={s.containerload}></div>
          <p className={s.textload}>Loading...</p>
        <div className={s.containerresetload}>
          <button className={s.buttonresetpage} onClick={(e) => handleResetPage(e)}>Reset Page</button>
        </div>
      </div>

    )
  }
}