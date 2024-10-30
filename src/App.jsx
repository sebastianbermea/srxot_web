import './App.css'
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import Premio from './pages/Premio';


function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Inicio}/>
          <Route path='/premioocastigo' exact Component={Premio}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
