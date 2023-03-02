import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";
import s from './NavBar.module.css';

export default function Navbar({setCurrentPage}){
  return(
    <div className={s.containerNav}>
      <div className={s.containertitle}>
        <h2 className={s.title}>Videogame List:</h2>
        <Link to={'/create'}><button className={s.buttoncreate}>Let´s to Create</button></Link>
      </div>
      <div className={s.containerbar}>
        <SearchBar setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  )
}