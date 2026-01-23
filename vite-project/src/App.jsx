import React from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>  
  )
}

export default App