import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogames, getAllGenre, getAllGames } from "../../Action/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./create.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Enter the name of the game";
  if (!input.description) errors.description = "Enter the game description";
  if (!input.rating || input.rating < 0 || input.rating > 10)
    errors.rating = "The game rating is between 1 - 10";
  if (!input.platforms.length) errors.platforms = "Enter platforms";
  if (!input.release) errors.release = "Select released date";
  if (!input.genres.length) errors.genres = "Select all necessary genre";
  return errors;
}

export default function Creategame() {
  const dispatch = useDispatch();
  const history = useHistory(); //redirigir a la ruta que yo diga
  const allGenre = useSelector((state) => state.genres);
  const allVideogames = useSelector((state) => state.videogames);

  const [errors, setErrors] = useState({});
  const [button, setButton] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    platforms: [],
    image: "",
    genres: [],
  });

  useEffect(() => {
    dispatch(getAllGenre());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectPlat = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
    );
  };

  const handleSelectGen = (e) => {
    if (
      errors.name ||
      errors.description ||
      errors.rating ||
      errors.platforms ||
      errors.release ||
      errors.genres
    ) {
      setButton(false);
    } else {
      setButton(true);
    }
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.description ||
      errors.rating ||
      errors.release ||
      errors.name
    ) {
      alert("Complete the form...");
    } else {
      let nameVideogame = [];
      allVideogames.map((e) => nameVideogame.push(e.name));
      if (nameVideogame.includes(input.name)) {
        alert("The game you want create already exists");
        setInput({
          name: "",
          description: "",
          release: "",
          rating: "",
          platforms: [],
          image: "",
          genres: [],
        });
      } else {
        dispatch(postVideogames(input));
        alert("Videogames Created!!");
        setInput({
          name: "",
          description: "",
          release: "",
          rating: "",
          platforms: [],
          image: "",
          genres: [],
        });
        history.push("/home");
      }
    }
  };


  return (
    <div className={s.containerform}>
      <Link to="/home">
        <button className={s.buttomback}>Home</button>
      </Link>
      <div className={s.containerencabezado}>
        <h1 className={s.titlecreate}>Create Your Videogames!</h1>
      </div>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className={s.labelForm}>Name: </label>
          <input
            className={s.input}
            type="text"
            placeholder="Game Name..."
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className={s.errorsmsg}>{errors.name}</p>}
        </div>
        <div>
          <label className={s.labelForm}>Description: </label>
          <input
            className={s.input}
            type="text"
            placeholder="Game description..."
            value={input.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && (
            <p className={s.errorsmsg}>{errors.description}</p>
          )}
        </div>
        <div>
          <label className={s.labelForm}>Released:</label>
          <input
            className={s.input}
            type="date"
            placeholder="Game Released..."
            value={input.release}
            name="release"
            onChange={handleChange}
          />
          {errors.release && <p className={s.errorsmsg}>{errors.release}</p>}
        </div>
        <div>
          <label className={s.labelForm} >Rating: </label>
          <input
            className={s.input}
            type="number"
            placeholder="Rating..."
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
          {errors.rating && <p className={s.errorsmsg}>{errors.rating}</p>}
        </div>
        <div>
          <label className={s.labelForm}>Platforms:</label>
          <input type="checkbox" value="PC" onChange={handleSelectPlat}/>PC
          <input type="checkbox" value="Xbox Series S/X" onChange={handleSelectPlat}/>Xbox Series S/X
          <input type="checkbox" value="PlayStation 4" onChange={handleSelectPlat} />PlayStation 4
          <input type="checkbox" value="Xbox 360" onChange={handleSelectPlat}/>Xbox 360
          <input type="checkbox" value="Xbox One" onChange={handleSelectPlat}/>Xbox One
          <input type="checkbox" value="PlayStation 5" onChange={handleSelectPlat}/>PlayStation 5
          <input type="checkbox" value="Nintendo Switch" onChange={handleSelectPlat} />Nintendo Switch
          <input type="checkbox" value="Linux" onChange={handleSelectPlat}/>Linux    
          <input type="checkbox" value="macOS" onChange={handleSelectPlat}/>macOS
          <input type="checkbox" value="PlayStation 3" onChange={handleSelectPlat}/>PlayStation 3
          <input type="checkbox" value="Android" onChange={handleSelectPlat}/>Android
          <input type="checkbox" value="iOS" onChange={handleSelectPlat}/>iOS
          <input type="checkbox" value="PS Vita" onChange={handleSelectPlat}/>PS Vita
          {/* {errors.platforms && <p className={s.errorsmsg}>{errors.platforms}</p>} */}
          {/* <select className={s.selectform} onChange={handleSelectPlat}>
            <option>Platforms</option>
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
          </select> */}
        </div>
        <div>
          <label className={s.labelForm}>Image URL</label>
          <input
            className={s.input}
            type="text"
            placeholder="URL image..."
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={s.labelForm}>Genres:</label>
          {/* <select className={s.selectform} onChange={handleSelectGen}>
            <option>Genres</option> */}
          {allGenre.map((g, i) => (
            // <option key={i} value={g.name}>
            //   {g.name}
            // </option>
            <div key={i} className={s.contgenre}>
              <input type="checkbox" value={g.name} onChange={handleSelectGen}/>
              <label >{g.name}</label>
            </div>
          ))}
          {/* </select> */}
        </div>
        <div className={s.boxbuttoncreate}>
          <button
            className={s.buttoncreategame}
            type="submit"
            disabled={!button}
          >
            Create Videogames
          </button>
        </div>
      </form>
    </div>
  );
}
