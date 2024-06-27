import React from 'react';
import SapnaLogo from './Logo/SapnaLogo.png';
import { Link } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {

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
          <li><Link to='/' className="link">Login</Link></li>
          <li><Link to='/signup' className="link">Signup</Link></li>
         
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
