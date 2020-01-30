import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";


export default class Movie extends React.Component {
  constructor(props) {

    super(props);
    console.log(`MOVIE`, props)
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

 handleUpdate = movie => { // needs to setState for updateMovie function????
    this.props.movieToEdit(movie);
    this.props.history.push(`/update-movie/${this.state.movie.id}`)
  }

  handleDelete = movie => {
    axios 
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res.data)
        this.setState(res.data)
        this.props.history.push("/");
      })
      .catch(err => console.log(`delete error`, err))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="edit-button" onClick={() => this.handleUpdate(this.state.movie)}>
          Edit
        </div>
        <div className="del-button" onClick={() => this.handleDelete(this.state.movie)}>
          Remove
        </div>
      </div>
    );
  }
}
