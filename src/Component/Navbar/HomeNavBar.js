import React from 'react';
import SapnaLogo from './Logo/SapnaLogo.png';
import { Link } from "react-router-dom";
import './Navbar.css'
const HomeNavBar = () => {

  return (
    <header className='header'>
      <div className='logo-container'>
        <Link to='/' className='logo-link'>
          <img src={SapnaLogo} alt='logo of ngo' className='logo-image' />
          <h3 className='ngo-name'>Aandam-Home for the homeless</h3>
        </Link> 
      </div>
      <nav>
        <ul>
          <li><Link to='/home' className="link">Details Form</Link></li>
          <li><Link to='/patientdata' className="link">All Patients Details</Link></li>
          {/* <li><Link to='/report' className="link">Report</Link></li> */}
          <li><Link to='/logout' className="link">Logout</Link></li>
         
        </ul>
      </nav>
    </header>
  );
}

export default HomeNavBar;
