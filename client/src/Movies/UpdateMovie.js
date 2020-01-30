import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const initialFilm = {
  id: "",
  title: '',
  director: '',
  metascore: null,
  stars: [],
}

const UpdateMovie = props => {
  console.log(`update movie`, props)
  const [film, setFilm] = useState(initialFilm);
  const { id } = useParams();

  useEffect(() => {
    if (props.currentMovie) {
      setFilm({
        title: props.currentMovie.title,
        director: props.currentMovie.director,
        metascore: props.currentMovie.metascore,
        stars: props.currentMovie.stars
      });
    } else {
      props.history.push("/");
    }
  }, [props.currentMovie])
  

  const changeHandler = e => {
    setFilm({
      ...film,
      [e.target.name]: e.target.value
    });
  };

  const starHandler = e => {
    setFilm({
      ...film,
      [e.target.name]: e.target.value.split(",")
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios 
      .put(`http://localhost:5000/api/movies/${id}`, film)
      .then(res => {
        props.setMovies(res.data)
        props.history.push(`/`)
      })
      .catch(err => console.log(`FORM SUBMIT`, err))
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={film.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          value={film.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          value={film.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={starHandler}
          value={film.stars}
        />
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateMovie


