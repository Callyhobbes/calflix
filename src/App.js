import React, { useState, useEffect } from 'react';
import Loader from './Loader.js';
import Banner from './Banner.js';
import Row from './Row.js';
import Navbar from './Navbar'
import request from './request.js';
import './styling/App.scss'

function App(props)  {

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const timer = 0;
    setTimeout(() => {
      setLoader(true)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

    return (
      <div className="app">
        <Loader loader={loader} />
        <Navbar />
        <Banner />
        <Row title="Trending Now" fetchURL={request.fetchTrending} />
        <Row title="Top Rated" fetchURL={request.fetchTopRated} />
        <Row 
        title="Netflix Originals" 
        fetchURL={request.fetchNetflixOriginals}
        isLargeRow={true}
        />
        <Row title="Action Movies" fetchURL={request.fetchActionMovies} />
        <Row title="Comedy Movies" fetchURL={request.fetchComedyMovies} />
        <Row title="Horror Movies" fetchURL={request.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchURL={request.fetchRomanceMovies} />
        <Row title="Documentaries" fetchURL={request.fetchDocumentaries} />
      </div>
    )
}

export default App;

