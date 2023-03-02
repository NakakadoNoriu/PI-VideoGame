import React from "react";
import {Link} from 'react-router-dom'
import style from './land.module.css'

const imagen = "https://www.pngplay.com/wp-content/uploads/13/Aesthetic-Gaming-Download-Free-PNG.png"

export default function Landing(){
  
  return(
    <div className={style.containerLanding}>
      <div className={style.containersalido}>
        <Link to='/home'>
          <button className={style.homebutton}>
            Videogame App
          </button></Link>
      </div>
    </div>
  )
}