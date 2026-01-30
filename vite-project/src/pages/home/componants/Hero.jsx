import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeclareClick = () => {
    if (user) {
      navigate('/add-item');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-500 to-purple-600 text-white py-20 px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">Lost & Found</h1>
      <p className="text-xl mb-8">Help reunite lost items with their owners</p>
      <button 
        onClick={handleDeclareClick}
        className="bg-white text-gray-600 px-8 py-4 rounded-lg text-lg font-semibold hover:cursor-pointer hover:text-white hover:bg-purple-400 transition shadow-lg hover:shadow-xl"
      >
        Declare a Lost Item Now
      </button>
    </div>
  );
}
