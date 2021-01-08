import React, { useState, useEffect } from 'react';
import axios from './axios.js';
import './Row.css';

// poster base URL
const base_URL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);

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

  console.log(movies);

  return (
    <div className="row">
      {/*Title*/}
      <h2>{title}</h2>

      <div className="row-posters">
        {/* Row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row-poster ${isLargeRow && "row-poster-large"}`}
            src={`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
            alt={`${movie.title || movie.name} poster`}>
          </img>
        ))}
      </div>
      {/*container -> posters*/}

    </div>
  )
}

export default Row
