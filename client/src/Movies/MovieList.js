import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";


export default class MovieList extends Component {
  constructor(props) {
    console.log(`movieList props`, props)
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  handleUpdate = e => { // working
    e.preventDefault();
    this.props.history.push(`/update-form/${this.state.movie.id}`)
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <div>
            <MovieDetails key={movie.id} movie={movie} />
            <MovieBar key={movie.id} movie={movie}/>
          </div>
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
      
    </Link>
  );
}

function MovieBar({ movie }) {
  return (
    <div>
      <Link to={`/update-movie/${movie.id}`}>
      </Link>
    </div>
  )
}
