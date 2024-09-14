import React from 'react';
import "./Navigation.css";
import { Link } from 'react-router-dom';
const Navigation = () => {
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
            <Link to="/signup"><h2 className='nav-links'>Sign up</h2></Link> 
            </div>
        </div>
    </div>
  );
};

export default Navigation;
