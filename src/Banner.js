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
        backgroundImage: `linear-gradient(180deg, transparent, rgba(37, 37, 37, .6), #111), url(${base_URL}${movie?.backdrop_path})`,
        backgroundPosition: "50% 25%"
      }}
    >
      {/* {background image} */}
      <div className="banner-content">
      {/* {title} */}
        <h2 className="banner-title">{movie.title || movie.name}</h2>
      {/* {description} */}
        <h3 className="banner-description">{truncate(movie?.overview, 150)}</h3>
        {/* {div > 2 buttons} */}
        <div className="banner-buttons">
          <button className="banner-button play"><i class="fas fa-play"></i>Play</button>
          <button className="banner-button info"><i class="fas fa-info"></i>More Info</button>
        </div>
      </div>
    </header>
  )
}

export default Banner;
