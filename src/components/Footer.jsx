import React from 'react'
import '../styles/Footer.css';
import { Link } from "react-router-dom";
import srxotlogo from '../assets/srxotlogo_negro.svg';

import instagram from '../assets/icons/instagram.svg';
import facebook from '../assets/icons/facebook2.svg';
import tiktok from '../assets/icons/tiktok.svg';

function Footer() {
  return (
    <div>
      <hr></hr>
      <div className='footer'>
        <div className='links'>
          <Link to="/terminos"> Terminos y condiciones</Link>
          <Link to="/aviso">Aviso de privacidad</Link>
        </div>
        <div className='center'>
          <img src={srxotlogo} alt="Sr. Xot logo negro" />
          Copyright © 2025 Sr Xot ®
        </div>
        <div className='socialmedia'>
          <a href="https://www.instagram.com/sr.xot">
            <img src={instagram} alt="instagram" />
          </a>
          <a href="https://www.facebook.com">
            <img src={facebook} alt="facebook" />
          </a>
          <a href='https://www.tiktok.com/@srxot'>
            <img src={tiktok} alt="tiktok" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer