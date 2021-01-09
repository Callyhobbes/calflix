import React, { useState, useEffect, Fragment } from 'react';
import axios from './axios.js';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// poster base URL
const base_URL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads and don't run again
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  };

  const handleClick = (movie) => {
    console.log(movie);
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          // https://www.youtube.com/watch?v=thisIsTheEndPoint so get the 'v'
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => {
          console.log(error)
        })
    };
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {/* Row posters */}
        {movies.map((movie) => (
          <div 
            className="content"
            onClick={() => handleClick(movie)}
          >
            <img
              key={movie.id}
              className={`row-poster ${isLargeRow && "row-poster-large"}`}
              src={`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
              alt={`${movie.title || movie.name} poster`}
            >
            </img>
            <div className="mask"></div>
            <p className="movie-title">{movie.title || movie.name}</p>
          </div>
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row
