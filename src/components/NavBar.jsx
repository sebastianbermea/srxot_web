import React, { useState } from 'react';
import srxotlogo from '../assets/srxot_horizontal.svg';
import {Link, NavLink} from "react-router-dom";
import '../styles/Navbar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/">
               <img src={srxotlogo} alt="Sr. Xot logo" />
        </Link>
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
        </div>
      <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/premioocastigo">Premio o Castigo</NavLink>
          </li>
          <li>
            <NavLink to="/productos">Productos</NavLink>
          </li> 
          <li>
            <NavLink to="/nosotros">Nosotros</NavLink>
          </li>
          <li>
              <NavLink to="/contacto">Contacto</NavLink>
          </li>
        </ul>
    </nav>
  )
}

export default NavBar