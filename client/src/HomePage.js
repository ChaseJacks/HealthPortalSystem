import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'

class HomePage extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <h1>Welcome to the Patient Portal!</h1>
        <p className='printed-line'>Please sign in or sign up.</p>
        <div>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;

