import React from "react";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail, resetDetail, resetError } from "../../Action/actions";
import { useEffect } from "react";
import s from './detail.module.css';

export default function Detail(props){
  
  let {id} = useParams()
  const dispatch = useDispatch();
  const myVideogames = useSelector(state => state.detail);
  const errorDetail = useSelector(state => state.errors);
  console.log(errorDetail)
  console.log(myVideogames)
  console.log(id)

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(resetDetail())
    }
  },[dispatch])

 
  if(!errorDetail){
    return(
      <div className={s.containerdetail}>
        <div className={s.boxdetail}>
        {
          myVideogames.length && myVideogames[0]? 
            <div className={s.boxallinfo}>
              <div className={s.boxbutton}>
              <Link to='/home'><button className={s.buttonback}>Go to Back</button></Link>
              </div>
              <h1 className={s.name}>Name: {myVideogames[0].name}</h1>
              <img className={s.image} src={myVideogames[0].image} alt="Games image" />
              <p className={s.description}>Description: {myVideogames[0].description}</p>
              <h3 className={s.release}>Release: {myVideogames[0].release}</h3>
              <h3 className={s.rating}>Rating: {myVideogames[0].rating}</h3>
              <h4 className={s.platforms}>Platforms: {myVideogames[0].platforms + " "}</h4>
              <h4 className={s.genre}>Genres: {!myVideogames[0].createInDb? myVideogames[0].genre + " " : myVideogames[0].genres.map(e => e.name + (" "))}</h4>
            </div>
        :<p>loading</p>} 
        </div>
      </div>
    )
  }else{
    return(
      <div>
        {
          errorDetail && 
            <div>
              <p className={s.msgerror}>No existe un juego con el </p>
              <div className={s.boxbutton}>
                <Link to='/home'><button className={s.buttonback}>Go to Back</button></Link>
              </div>
            </div>
        } 
      </div>
    )
  }
}


