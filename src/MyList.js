import React, { useState, useEffect } from 'react';
import firebase from './firebase.js';
import noPoster from './assets/no-poster.svg';
import PopUp from './PopUp.js';

function MyList({ title }) {

  const [movies, setMovie] = useState([]);

  useEffect(() => {
  //   // Here we create a variable that holds a reference to our database
    const dbRef = firebase.database().ref();


    console.log(firebase.database().ref());

  //   // // Here we add an event listener to that variable that will fire
  //   // // every time there is a change in the database.

  //   // // This event listener takes a callback function which we will use to get our data
  //   // // from the database, and call that data 'response'.
    dbRef.on('value', (response) => {

      const newState = [];
      const data = response.val();

      for (let key in data) {
        // inside the loop, push each book name to an array we already created inside the .on() function called newState
        newState.push(data[key]);
      }
      // then, we call setMovie in order to update our component's state using the local array newState
      setMovie(newState);
    })
  }, [])

  // poster base URL
  const base_URL = "https://image.tmdb.org/t/p/original";

  const test = (info) => {
    if (info.backdrop_path) {
      return `${base_URL}${info.backdrop_path}`
    } else {
      return noPoster
    }
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [film, setFilm] = useState([]);

  const handleClick = (movie) => {
    setFilm(movie);
    openModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  console.log(movies);
  return (
    <div className="row">
      <h2 className="row-title">{title}<em>See all</em></h2>
      <div className="row-posters">
        {movies.map((movie, key) => {
          return (
          <div
            key={key}
            className="content"
            onClick={() => handleClick(movie)}
          >
            <img
              className='row-poster'
              src={test(movie)}
              alt={`${movie.title || movie.name} poster`}
            >
            </img>
            <div className="mask"></div>
            <p className="movie-title">{movie.title || movie.name}</p>
          </div>
          )
        })}
      </div>
      {
        modalIsOpen
          ? <PopUp movieDetails={film} modal={modalIsOpen} action={setIsOpen} />
          : null
      }
    </div>
  )
}

export default MyList
