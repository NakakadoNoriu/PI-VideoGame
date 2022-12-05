import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNameVideogame } from '../../Action/actions';
import s from './sBar.module.css'


export default function SearchBar({setCurrentPage}){

  const dispatch = useDispatch();
  const allgames = useSelector(state => state.allVideogames)
  //estado local
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    // console.log(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameName = allgames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    if(name && gameName.length === 0){
      alert("The game does not exist");
      setName('')
    }else if(gameName){
      dispatch(getNameVideogame(name))
      setName('')
      setCurrentPage(1)
    }
  }

  return(
    <div className={s.containerSearchbar}>
      <input className={s.input} type="text"  placeholder="Search..." value={name} onChange={handleInputChange} />
      <button className={s.barbutton} type='submit'  onClick={(e) => handleSubmit(e)}>
        S
      </button>
    </div>
  )
}