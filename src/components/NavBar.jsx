import React, { useState } from 'react';
import srxotlogo from '../assets/srxot_horizontal.svg';
import srxotwhite from '../assets/srxot_horizontal_white.svg';
import {Link, NavLink} from "react-router-dom";
import '../styles/Navbar.css';
import menuIcon from '../assets/icons/menu.svg';
import closeIcon from '../assets/icons/close.svg';
import instagram from '../assets/icons/instagram_white.svg';
import tiktok from '../assets/icons/tiktok_white.svg';
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { title: "Inicio", href: "/" },
  { title: "Premio o Castigo", href: "/premioocastigo" },
  { title: "Productos", href: "/productos" },
  { title: "Nosotros", href: "/nosotros" },
  { title: "Contacto", href: "/contacto" },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuVars = {
    initial: {
      y: '-100vh',
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      y: '-100vh',
      transition: {
        delay: 0.25,
        duration: 0.25,

      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.7,
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <nav>
      <Link to="/">
        <img className='icon' src={srxotlogo} alt="Sr. Xot logo" />
        </Link>
      {!menuOpen && <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <img src={menuIcon} alt="" />
        </div>}
      <ul>
          {
            navLinks.map((link, index)=>{
              return (
                <li>
                  <NavLink key={index} to={link.href}>{link.title}</NavLink>
                </li>
              );
            })
          }
        </ul>
        <AnimatePresence>
        {menuOpen && 
        <motion.div 
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
        className='mobile'>
          <div>
          <img className='icon' src={srxotwhite} alt="Sr. Xot logo" />
            <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
              <img src={closeIcon} alt="" />
            </div>
          </div>
          <motion.div 
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
          className='submenu'>
          {
            navLinks.map((link, index) => {
              return (
                <motion.div
                  variants={mobileLinkVars}
                >
                  <NavLink key={index} to={link.href} onClick={()=>setMenuOpen(false)}>{link.title}</NavLink>
                </motion.div>
              );
            })
          }
            <motion.div 
                variants={mobileLinkVars}
            className='social'>
            <a href="https://www.instagram.com/sr.xot">
              <img src={instagram} alt="instagram" />
            </a>
            
            <a href='https://www.tiktok.com/@srxot'>
              <img src={tiktok} alt="tiktok" />
            </a>
            </motion.div>
          </motion.div>
        </motion.div>
        }
      </AnimatePresence>
    </nav>
  )
}

export default NavBar