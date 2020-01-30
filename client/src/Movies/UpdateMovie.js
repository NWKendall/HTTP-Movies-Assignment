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
  const [film, setFilm] = useState(initialFilm);
  const { id } = useParams();

  // useEffect(() => {
  //   const movieToUpdate = props.movies.find(film => `${film.id}` === id);

  //   if(movieToUpdate){
  //     setFilm(movieToUpdate)
  //   }
  // }, [props.movies, id]);

  
  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  const changeHandler = e => {
    e.persist();    
    setFilm({
      ...film,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios 
      .put(`http://localhost:5000/api/movies/${id}`, film)
      .then(res => {
        props.setMovies(res.data)
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
          type="number"
          name="metascore"
          onChange={changeHandler}
          value={film.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          value={film.stars}
        />
      </form>
    </div>
  )
}

export default UpdateMovie


