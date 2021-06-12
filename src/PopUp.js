import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Keanu from './assets/keanu-min.jpg';

export default function PopUp(props) {

  const [selectMovie, setSelect] = useState(['tenet']);
  const apiKey = '1c039e11'
  const base_URL = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
      axios({
        url: `https://www.omdbapi.com/?apikey=${apiKey}`,
        method: 'GET',
        responseType: 'json',
        params: {
          t: `${props.movieDetails.name || props.movieDetails.title}`
        }
      }).then((movies) => {
        setSelect(movies.data);
      }).catch((error) => {
        console.log(error)
      })
    }, []);

  function closeModal() {
    props.action(false);
  }

    function determineType(info) {
    if (info.Type === 'series') {
      if (info.totalSeasons < 2) {
        return `${info.totalSeasons} season`
      } else {
        return `${info.totalSeasons} seasons`
      }
    } else {
      return runTime(info.Runtime);
    }
  }

  function runTime(info) {
    const textModified = info.split(' ')[0];
    const length = parseInt(textModified);
    if (isNaN(length)) {
      return null
    } else if (length < 60) {
      return `${length}m`
    } else {
      const findHrs = Math.floor(length / 60);
      const findMins = length % 60;
      if (findMins === 0) {
        return `${findHrs}h`
      }
      return `${findHrs}h ${findMins}m`
    }
  }

  console.log(selectMovie);

  if (selectMovie.Response === 'False') {
    return (
      <div>
        <Modal
          isOpen={props.modal}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="Modal"
          overlayClassName="Overlay"
        >
          <Fragment>
            <img src={Keanu} alt="Keanu Reeves with hands up" />
            <div className="movie-content">
              <h2>What an odd find.</h2>
              <p>It looks like there isn't enough information on this movie currently.</p>
              <p>Try checking out another movie.</p>
              <button onClick={closeModal}>
                <span className="material-icons">close</span>
              </button>
            </div>
          </Fragment>
        </Modal>
      </div>
    )
  } else if (selectMovie.Year){
    return (
      <div>
        <Modal
          isOpen={props.modal}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="Modal"
          overlayClassName="Overlay"
        >
          <Fragment>
            {/* Using TMDB API image for better quality */}
            <img src={`${base_URL}${props.movieDetails.backdrop_path}`} alt={selectMovie.Title} />
            <div className="movie-content">
              <h2>{selectMovie.Title}</h2>
              <ul>
                <li>{selectMovie.Year.slice(0, 4)}</li>
                <li className="border-item">{selectMovie.Rated !== 'N/A' ? selectMovie.Rated : 'Not Rated'}</li>
                <li>
                  {determineType(selectMovie)}
                  {/* {selectMovie.Runtime ? runTime(selectMovie.Runtime) : null} */}
                </li>
              </ul>
              <p>{selectMovie.Plot}</p>
              <h4><span>Cast:</span></h4>
              <p>{selectMovie.Actors}</p>
              <h4><span>Genres:</span></h4>
              <p>{selectMovie.Genre}</p>
              <button onClick={closeModal}>
                <span className="material-icons">close</span>
              </button>
            </div>
          </Fragment>
        </Modal>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}
