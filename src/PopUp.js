import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
          t: `${props.movieDetails.name}`
        }
      }).then((movies) => {
        setSelect(movies.data);
      })
    }, []);

  function closeModal() {
    props.action(false);
  }

  function runTime(info) {
    const textModified = info.split(' ')[0];
    const length = parseInt(textModified);

    if (length < 60) {
      return `${length}m`
    } else {
      const findHrs = length / 60;
      const findMins = length % 60;
      if (findMins === 0) {
        return `${findHrs}h`
      }
      return `${findHrs}h ${findMins}m`
    }
  }

  function determineType(info) {
    if (info.Type === 'series') {
      if (info.totalSeasons === 1) {
        return `${info.totalSeasons} season`
      }
      return `${info.totalSeasons} seasons`
    } else {
      runTime(info.Runtime);
    }
  }

  console.log(selectMovie);


  return (
    <div>
      <Modal
        isOpen={props.modal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
      >
        {
          selectMovie.Year &&
          <Fragment>
            {/* Using TMDB API image for better quality */}
            <img src={`${base_URL}${props.movieDetails.backdrop_path}`} alt={selectMovie.Title} />
            <div className="movie-content">
              <h2>{selectMovie.Title}</h2>
              <ul>
                <li>{selectMovie.Year.slice(0, 4)}</li>
                <li className="border-item">{selectMovie.Rated}</li>
                <li>
                  {determineType(selectMovie)}
                  {/* {selectMovie.Runtime ? runTime(selectMovie.Runtime) : null} */}
                </li>
              </ul>
              <p>{selectMovie.Plot}</p>
              <p><span>Cast:</span> {selectMovie.Actors}</p>
              <p><span>Genres:</span> {selectMovie.Genre}</p>
              <button onClick={closeModal}>
                <span class="material-icons">close</span>
              </button>
            </div>
          </Fragment>
        }
      </Modal>
    </div>
  )
}
