import React from 'react'
import img1 from '../assets/images/BotellaMano.png';
import srxotlogo from '../assets/srxotlogo.svg';
import { Link} from "react-router-dom";
import '../styles/Hero.css';
function Hero() {
  return (
      <div className='hero'> 
          <div className='hero-text'>
              <img className='logo' src={srxotlogo} alt="Sr. Xot logo" />
              <h1>#PREMIO O CASTIGO</h1>
              <p>Lleva la fiesta al siguiente nivel</p>
              <Link to="/premioocastigo">
                  Jugar aqui
              </Link>
          </div>
         <img className='hero-img' src={img1} alt="Sr. Xot foto 1" />
       
      </div>
  )
}

export default Hero