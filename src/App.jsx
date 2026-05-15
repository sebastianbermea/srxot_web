import './App.css'
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

import { auth } from "./firebase/credentials";
import { useUser } from "./contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import AgeModal from './components/AgeModal';

function App() {
  const { setUser } = useUser();
  onAuthStateChanged(auth, (firebaseUser) => {
    console.log(firebaseUser);
    if (firebaseUser) setUser(firebaseUser);
    if (!firebaseUser) setUser(null);
  });

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
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
