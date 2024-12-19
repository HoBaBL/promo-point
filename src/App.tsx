import './App.css'
import Header from "./components/header/header"
import Footer from './components/footer/footer'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('nameStore', "Купер");
    navigate('/home')
  },[])

  return (
    <div className='mainPosition'>
      <Header/>
      <main style={{marginTop:'80px', marginBottom: "40px"}}>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
