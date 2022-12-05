import React from "react";
import s from './games.module.css'
import { Link } from "react-router-dom";

export default function Games({id, image, genre, name, rating}){
  return(
    <div className={s.cardContainer}>
      <div className={s.containerimage}>
        <Link to={`/videogame/${id}`}>
          <img className={s.image} src={image} alt="game's image" />
        </Link>
      </div>
      <div className={s.text}>
        <h4 className={s.name}>
          Name: {name}
          <br />
          Genres: {genre + ","}
          <br />
          Rating: {rating}
        </h4> 
      </div>
    </div>
  )
}