import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './pages/navbar'
import Footer from './pages/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/register'
import Home from './pages/home/Home'
import User from './pages/user/user'
import AddItem from './pages/items/AddItem'
import AdminDashboard from './pages/admin/AdminDashboard'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-items" element={<User />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App