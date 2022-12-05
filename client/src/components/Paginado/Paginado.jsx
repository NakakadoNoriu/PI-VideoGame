import React from "react";
import s from './paginado.module.css'

export default function Paginado({gamesPerPage, videogame, paginado}){
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(videogame/gamesPerPage); i++) { //todo videogames / videogames por pagina
    
    pageNumbers.push(i); //para que no inicie del cero(0)
  }
//este componente renderiza el numero de paginas
  return(
    <div className={s.containernav}>
      <nav className={s.nav}>
        <ul className={s.ul}>
          {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <div key={number} className={s.containerlist}>
                <li  className={s.list} >
                  <a  className={s.link} onClick={() => paginado(number)}>{number}</a>
                </li>
              </div>
            )
          })}
        </ul>
      </nav>
    </div>
  )
};

//paginado(number) => se le pasa el numero de pagina que tiene en pageNumber
