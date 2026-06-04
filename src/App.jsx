import './App.css'
import React, { useEffect } from 'react';
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import Premio from './pages/Premio';
import Producto from './pages/Producto';
import Tienda from './pages/Tienda';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Account from './pages/Account';
import Success from './pages/Success';
import Terminos from './pages/Terminos';
import Aviso from './pages/Aviso';
import ScrollToTop from './components/ScrollToTop';
import Cart from './components/Cart';
import AdminDashboard from './admin/AdminDashboard';

import { auth } from "./firebase/credentials";
import { useUser } from "./contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import AgeModal from './components/AgeModal';

import ReactPixel from 'react-facebook-pixel';

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    // 1. 🔒 Control seguro del estado de autenticación (Una sola instancia)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log(firebaseUser);
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    // 2. ⚙️ Opciones de configuración inicial de Meta
    const options = {
      autoConfig: true,
      debug: false,
    };

    // 3. 🚀 Inicializa el Píxel con tu ID Real
    ReactPixel.init('1659296348656819', null, options);
    ReactPixel.pageView();

    // Limpieza: Cuando la app se desmonte (raro que pase), destruye el escuchador de auth
    return () => unsubscribe();
  }, [setUser]); // Añadimos setUser como dependencia buena práctica

  return (
    <div className='App'>
      <AgeModal/>
      <Router>
        <ScrollToTop/>
        <Cart />
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Inicio}/>
          <Route path="producto/:id" exact Component={Producto} />
          <Route path='/premioocastigo' exact Component={Premio}/>
          <Route path='/tienda' exact Component={Tienda}/>
          <Route path='/nosotros' exact Component={Nosotros}/>
          <Route path='/contacto' exact Component={Contacto}/>
          <Route path='/account' exact Component={Account}/>
          <Route path='/success' exact Component={Success}/>
          <Route path='/terminos' exact Component={Terminos}/>
          <Route path='/aviso' exact Component={Aviso}/>
          <Route path='/admin-panel' exact Component={AdminDashboard}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
