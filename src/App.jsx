import { useState } from 'react'
import srxotlogo from './assets/srxotlogo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={srxotlogo} className="logo" alt="Sr. Xot logo" />
      </div>
      <h1>Proximamente...</h1>
     
    </>
  )
}

export default App
