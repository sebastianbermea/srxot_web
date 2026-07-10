import React, { useState } from 'react';
import srxotlogo from '../assets/icons/srxot-horizontal.svg';
import { Link, NavLink } from "react-router-dom";
import '../styles/Navbar.css';
import menuIcon from '../assets/icons/menu-icon.svg';
import closeIcon from '../assets/icons/close_pink.svg';
import instagram from '../assets/icons/instagram_white.svg';
import tiktok from '../assets/icons/tiktok_white.svg';
import cart from '../assets/icons/cart.svg';
import user from '../assets/icons/user.svg';

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from '../contexts/cartContext';

const navLinks = [
  { title: "Tienda", href: "/tienda" },
  { title: "JUGAR", href: "/premioocastigo" },
  { title: "Nosotros", href: "/nosotros" },
  { title: "Contacto", href: "/contacto" },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, cartItems } = useCart();

  const menuVars = {
    initial: {
      x: '-100vw',
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      x: '-100vw',
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: [0.7, 0, 0.84, 0],
      },
    },
  };

  const mobileLinkVars = {
    initial: { y: "30vh", opacity: 0, transition: { duration: 0.25, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, opacity: 1, transition: { ease: [0, 0.55, 0.45, 1], duration: 0.7 } },
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.15, staggerChildren: 0.09, staggerDirection: 1 } },
  };

  return (
    <>
      {/* LA BARRA DE NAVEGACIÓN */}
      <nav className="navbar_pill">
        <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuIcon} alt="menu" />
        </div>

        <ul className='left_menu'>
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.href}>{link.title}</NavLink>
            </li>
          ))}
        </ul>

        <div className="center_logo">
          <Link to="/">
            <img className='icon' src={srxotlogo} alt="Sr. Xot logo" />
          </Link>
        </div>

        <div className='right_menu'>
          <Link to="/account">
            <img src={user} alt="user" />
          </Link>
          <button className='cart' onClick={openCart}>
            <img src={cart} alt="cart" />
            <span className='counter'>{cartItems.length}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="modal-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <div className="modal_backdrop" onClick={() => setMenuOpen(false)}>
              <motion.div
                variants={menuVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className='mobile'
                onClick={(e) => e.stopPropagation()}
              >
                <div className='submenu_top'>
                  <div className='menu' onClick={() => setMenuOpen(false)}>
                    <img src={closeIcon} alt="close" />
                  </div>
                  <NavLink className='icon' to='/' onClick={() => setMenuOpen(false)}> <img  src={srxotlogo} alt="Sr. Xot logo" /></NavLink>
                 
                  {/* <div style={{width: '28px'}}></div> */}
                </div>

                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className='submenu'
                >
                  {navLinks.map((link, index) => (
                    <motion.div key={link.title + index + 10} variants={mobileLinkVars} className="mobile_link_container">
                      <NavLink to={link.href} onClick={() => setMenuOpen(false)}>{link.title}</NavLink>
                    </motion.div>
                  ))}

                  <motion.div variants={mobileLinkVars} className='social'>
                    <a href="https://www.instagram.com/sr.xot" target="_blank" rel="noreferrer">
                      <img src={instagram} alt="instagram" /> <p>sr.xot</p>
                    </a>
                    <a href='https://www.tiktok.com/@srxot' target="_blank" rel="noreferrer">
                      <img src={tiktok} alt="tiktok" /> <p>srxot</p>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </>

        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;