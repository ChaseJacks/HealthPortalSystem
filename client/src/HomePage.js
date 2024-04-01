import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';


class HomePage extends React.Component {
    render() {

        // @author Richard Williams
        // Check if isAdmin is in local storage. This means they've been logged in. redirect to the right landing page
        if (localStorage.getItem("isAdmin")) {
            switch (localStorage.getItem("isAdmin")) {
                case 0:
                    window.location.href = "/landing";
                    break;
                case 1:
                    window.location.href = "/DoctorLand";
                    break;
                default:
                    console.log("Undefined user type. Removed important localStorage data");
                    localStorage.removeItem("isAdmin");
                    localStorage.removeItem("userID");
                    localStorage.removeItem("userTypeID");
                    localStorage.removeItem("name");
            }
        }
        // ---------------------------------------

    return (
      <div className='background-container'>
      <div className='wrapper' >
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
      </div>
    );
  }
}

export default HomePage;
