import { Component } from 'react';

class Loader extends Component {

  render() { 
    return (
      <div className={`logo ${this.props.loader ? 'hide' : ''}`}>
        <div className="calflix">
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
