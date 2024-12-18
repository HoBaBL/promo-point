import './App.css'
import Header from "./components/header/header"
import Footer from './components/footer/footer'
import { Outlet } from "react-router-dom";

function App() {

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
