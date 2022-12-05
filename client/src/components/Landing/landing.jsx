import React from "react";
import {Link} from 'react-router-dom'
import style from './land.module.css'

export default function Landing(){
  return(
    <div className={style.containerLanding}>
      <div className={style.containertitle}>
        <h1 className={style.title}>Welcome To My App</h1>
      </div>
      <div className={style.containerbutton}>
        <Link to='/home'><button className={style.homebutton}>Videogame App</button></Link>
      </div>
      <div className={style.containermsg}>
        <p className={style.msg}>Enjoy the experience</p>
      </div>
    </div>
  )
}