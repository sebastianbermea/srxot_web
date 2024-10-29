import './App.css'
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Inicio from './pages/Inicio';
import Footer from './components/Footer';


function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Inicio}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
