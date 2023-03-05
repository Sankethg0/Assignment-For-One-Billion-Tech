import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'



const Routing = () =>{
  
  return(
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}

function App() {
  return (
      
        <BrowserRouter>
          <Routing/>
        </BrowserRouter>
      
  );
}

export default App;
