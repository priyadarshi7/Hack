import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navigation.css';

const Navigation = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from cookies
    Cookies.remove('token');
    // Redirect to the homepage or login page
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <h2 className='nav-heading'>AthleX AI</h2>
      </div>
      <div className="nav-end">
        <div className="home-link">
          {token && (
            <button className='nav-links' onClick={handleLogout}>
              <h2>Logout</h2>
            </button>
          )}
        </div>
        <div className="auth-link">
          {token ? (
            <div className='links'>
              <h2>Welcome</h2>
            </div>
          ) : (
            <Link to="/signup">
              <div>
                <h2>Signup</h2>
              </div>
            </Link>
          )}
        </div>
        {token && (
          <div className='links'>
            <Link to="/profile">
              <h2>Profile</h2>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
