import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <nav>
      <ul className='nav-items text-center'>
        <li>
          <Link to='/'>User Form</Link>
        </li>
        <li>
          <Link to='/users-list'>Users List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
