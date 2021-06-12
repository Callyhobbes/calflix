import React, { Fragment, useState, useEffect } from 'react';
import PopUp from './PopUp.js';
import axios from './axios.js';
import request from './request.js';

const base_URL = "https://image.tmdb.org/t/p/original/";

function Banner(props) {
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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
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
        <h2>{movie.title || movie.name}</h2>
      {/* {description} */}
        <h3>{truncate(movie?.overview, 150)}</h3>
        {/* {div > 2 buttons} */}
        <div className="banner-buttons">
          <button className="play" onClick={openModal}><i className="fas fa-play"></i>Play</button>
          <button className="info" onClick={openModal}><i className="fas fa-info"></i>More Info</button>
        </div>
      </div>
      {
        modalIsOpen 
        ? <PopUp movieDetails={movie} modal={modalIsOpen} action={setIsOpen}/>
        : null
      }
    </header>
    
  )
}

export default Banner;