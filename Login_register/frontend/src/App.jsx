import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Singup from './singup'
import Login from './login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Singup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
