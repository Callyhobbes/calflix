import { Component } from 'react';
import './Loader.css';

class Loader extends Component {

  render() { 
    return (
      <div class={`logo ${this.props.loader ? 'hide' : ''}`}>
        <div class="calflix">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h3 className="logo-text">Calflix</h3>
      </div>
    )
  }
}

export default Loader;
