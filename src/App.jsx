import './App.css'
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import Premio from './pages/Premio';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';


function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Inicio}/>
          <Route path='/premioocastigo' exact Component={Premio}/>
          <Route path='/productos' exact Component={Productos}/>
          <Route path='/nosotros' exact Component={Nosotros}/>
          <Route path='/contacto' exact Component={Contacto}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
