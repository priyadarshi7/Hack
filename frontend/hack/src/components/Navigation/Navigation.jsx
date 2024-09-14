import React from 'react';
import "./Navigation.css";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie"
const Navigation = () => {
  const token = Cookies.get('token');
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <h2 className='nav-heading'>AthleX AI</h2>
        </div>
        <div className="nav-end">
            <div className="home-link">
            <Link to="/"><h2 className='nav-links'>Home</h2></Link>
            </div>
            <div className="signup-link">
            <div className='links'><h2>Welcome</h2></div>
            </div>
        </div>
    </div>
  );
};

export default Navigation;
