import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState();

  const movieToEdit = movie => {
    setCurrentMovie(movie)
}

const movieToDelete = movie => {
  setCurrentMovie(movie)
}

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" 
        render={props =>{
          return <MovieList {...props} />
        }}
      />      
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} 
          addToSavedList={addToSavedList} 
          movieToEdit={movieToEdit}
          movieToDelete={movieToDelete}
 />;
        }}  
      />
      <Route 
        path ="/update-movie/:id" 
        render={props => {
         return <UpdateMovie 
          {...props} 
          currentMovie={currentMovie}
          
         />;
        }}
      />
    </>
  );
};

export default App;
