import React, { useState, useEffect } from 'react';
import logo from './assets/calflix_logo.png';
import avatar from './assets/calvin_icon.jpg';
import search from './assets/search.svg'
import bell from './assets/notifications.svg'

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      };
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <h1 className="sr-only">Calflix</h1>
      <img className="calflix-logo" src={logo} alt="Calflix Logo"></img>
      <div className="activity-bar">
        <img src={search} alt="Search" />
        <img src={bell} alt="Favourite List" />
        <img src={avatar} alt="User Icon"/>
      </div>
    </div>
  )
}

export default Navbar;
