import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const isLoggedIn = user !== null;

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b-4 border-purple-500">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4 relative">
        <Link to="/" className="text-2xl font-bold text-gray-600 hover:text-purple-700 transition">
          🔍 Lost & Found
        </Link>

        <div className="flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Contact
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/add-item" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Add Item
              </Link>
              <Link to="/my-items" className="text-gray-700 hover:text-purple-600 font-medium transition">
                My Items
              </Link>
            </>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Admin Dashboard
            </Link>
          )}
        </div>

        <div className="flex gap-4 items-center relative z-10">
          {isLoggedIn ? (
            <>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                👤 {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition shadow-md">
                Login
              </Link>
              <Link to="/register" className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition shadow-md">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
