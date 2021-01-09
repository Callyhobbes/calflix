import React, { useState, useEffect } from 'react';
import logo from './assets/calflix_logo.png';
import avatar from './assets/calvin_icon.jpg';
import './Navbar.css';

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100) {
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
      <img className="calvin-icon" src={avatar} alt="User Icon"/>
    </div>
  )
}

export default Navbar;
