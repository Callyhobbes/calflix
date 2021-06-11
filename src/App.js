import React, { Component } from 'react';
import './App.css';
import Loader from './Loader.js';
import Banner from './Banner.js';
import Row from './Row.js';
import Navbar from './Navbar'
import request from './request.js';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      loader: false
    };
  }

  // Set intro fade
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loader: true
      })
    }, 3000);
  }

  // clear intro
  componentWillUnmount() {
    clearTimeout()
  }

  render() { 
    return (
      <div className="app">
        <Loader loader={this.state.loader} />
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
}

export default App;
