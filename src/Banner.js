import React, { useState, useEffect } from 'react';
import axios from './axios.js';
import request from './request.js';
import './Banner.css';

const base_URL = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(request.fetchNetflixOriginals);
      let BannerList = requests.data.results;
      setMovie(
        BannerList[Math.floor(Math.random() * (BannerList.length - 1))]
      );
      return requests;
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  
  return (
    <header 
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_URL}${movie?.backdrop_path})`,
        backgroundPosition: "center center"
      }}
    >
      {/* {background image} */}
      <div className="banner-content">
      {/* {title} */}
        <h2 className="banner-title">{movie.title || movie.name}</h2>
      {/* {div > 2 buttons} */}
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
      {/* {description} */}
        <h3 className="banner-description">{truncate(movie?.overview, 150)}</h3>
      </div>
      <div className="banner-fadeout"></div>
    </header>
  )
}

export default Banner;
