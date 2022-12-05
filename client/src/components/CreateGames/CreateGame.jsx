import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogames, getAllGenre } from "../../Action/actions";
import { useDispatch, useSelector } from "react-redux";
import s from './create.module.css';


function validate(input){
  let errors = {};
  if(!input.name) errors.name = "Enter the name of the game";
  if(!input.description) errors.description = "Enter the game description";
  if(!input.rating || input.rating < 0 || input.rating > 10) errors.rating = "The game rating is between 1 - 10";
  if(!input.platforms.length) errors.platforms = "Enter platforms";
  if(!input.release) errors.release = "Select released date";
  if(!input.genres.length) errors.genres = "Select all necessary genre";
  return errors;
};




export default function Creategame(){
  const dispatch = useDispatch();
  const history = useHistory();  //redirigir a la ruta que yo diga
  const allGenre = useSelector(state => state.genres);
  const allVideogames = useSelector(state => state.allVideogames);

  const [errors, setErrors] = useState({});
  const [button,setButton ] = useState(false)
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    platforms: [],
    image: "",
    genres: []
  });

  useEffect(() => {
    dispatch(getAllGenre());
  },[dispatch]);

  
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  

  const handleSelectPlat = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    })
    setErrors(validate({
      ...input,
      platforms: [...input.platforms, e.target.value],
    }))
  }

  const handleSelectGen = (e) => {
    if(errors.name || errors.description || errors.rating || errors.platforms || errors.release || errors.genres){
      setButton(false);
    }else{
      setButton(true)
    }
    setInput({
      ...input,
      genres: [...input.genres, e.target.value]
    })
    setErrors(validate({
      ...input,
      genres: [...input.genres, e.target.value]
    }))
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(errors.genres || errors.description || errors.rating || errors.platforms || errors.release || errors.name){
      alert('Complete the form...')
    }else{
      let nameVideogame = []
      allVideogames.map(e => nameVideogame.push(e.name))
      if(nameVideogame.includes(input.name)){
        alert("The game you want create already exists")
        setInput({
          name: "",
          description: "",
          release: "",
          rating: "",
          platforms: [],
          image: "",
          genres: []
        });
      }else{
        dispatch(postVideogames(input))
        alert("Videogames Created!!");
        setInput({
          name: "",
          description: "",
          release: "",
          rating: "",
          platforms: [],
          image: "",
          genres: []
        });
        history.push('/home')  
      }
    }
  };

  const handleDeleteGenre = (e) => {
    // e.preventDefault();
    setInput({
      ...input,
      genres: input.genres.filter(d => d !== e)
    })
  };

  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter(p => p !== e)
    })
  }

  return(
    <div className={s.containerform}>
      <div className={s.containerencabezado}>
        <h1 className={s.titlecreate}>Create Your Videogames!</h1>
        <Link to='/home'><button className={s.buttomback}>Back to Home</button></Link>
      </div>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input className={s.input} type="text" placeholder="Game Name..." value={input.name} name='name' onChange={handleChange}/>
          {errors.name && (
            <p  className={s.errorsmsg}>{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input className={s.input} type="text" placeholder="Game description..." value={input.description} name='description' onChange={handleChange} />
          {errors.description &&(
            <p className={s.errorsmsg}>{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="release">Released:</label>
          <input className={s.input} type="date" placeholder="Game Released..." value={input.release} name='release' onChange={handleChange}/>
          {errors.release &&(
            <p className={s.errorsmsg}>{errors.release}</p>
          )}
        </div>
        <div>
          <label htmlFor="rating">Rating: </label>
          <input className={s.input} type="number" placeholder='Rating...' value={input.rating} name='rating' onChange={handleChange}/>
          {errors.rating && (
            <p className={s.errorsmsg}>{errors.rating}</p>
          )}
        </div>
        <div>
          <label htmlFor="platforms">Platforms:</label>
          {/* <input type="text" placeholder='Plataformas...' value={input.platforms} name='platforms' onChange={handleChange}/> */}
          <select className={s.selectform} onChange={handleSelectPlat}>
            <option >Platforms</option>
            <option value="PC">PC</option>
            <option value="Xbox Series S/X">Xbox Series S/X</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="Xbox One">Xbox One</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Linux">Linux</option>
            <option value="macOS">macOs</option>
            <option value="PlayStation 3">PlayStation 3</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
            <option value="PS Vita">PS Vita</option>
          </select>
          
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input className={s.input} type="text" placeholder="URL image..." value={input.image} name='image' onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="Genres">Genres:</label>
          <select className={s.selectform} onChange={handleSelectGen}>
            <option>Genres</option>
            {allGenre.map((g,i) => 
              <option key={i} value={g.name}>{g.name}</option>
              )
            }
          </select>
          
        </div>

        <div className={s.boxbuttoncreate}>
          <button className={s.buttoncreategame} type="submit" disabled={!button}>Create Videogames</button>
        </div>
      </form>

      <div className={s.boxregisterplat}>
        <div className={s.containerregistroplat}>
          <h4 className={s.textregistroplat}>Platforms: </h4>
          {input.platforms.map((e,i) => 
            <div key={i} className={s.registroplat}>
              <h4 className={s.registrolist}>- {e}</h4>
              <button className={s.buttondelete} onClick={() => handleDeletePlatforms(e)}>X</button>
            </div>
        )}
        </div>
        {errors.platforms &&(
            <p className={s.errormsgplat}>{errors.platforms}</p>
          )}
      </div>

      <div className={s.boxregistrogenre}>
        <div className={s.containerregistrogen}>
          <h4 className={s.textregistrogenre}>Genres: </h4>
          {input.genres.map((e,i) =>
            <div key={i} className={s.registrogenre}>
              <h4 className={s.registrolistgenre}>- {e}</h4> 
            <button className={s.buttondeletegenre} onClick={() => handleDeleteGenre(e)}>X</button>
            </div>
          )}
          </div>
          {errors.genres && (
            <p className={s.errormsggenre}>{errors.genres}</p>
          )}
      </div>
    </div>
  )
}