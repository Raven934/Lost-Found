import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('please fill in all fields');
      return;
    }

    register({ name, email, password })
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((err) => {
        console.error('Registration error:', err.response?.data);
        const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Registration failed';
        setError(errorMsg);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Registered successfully! Please login.</span>
          </div>
        </div>
      )}
      <div className='w-full max-w-md bg-white p-8 rounded-xl'>
        <h1 className='text-2xl font-bold text-center mb-6'>Register</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mt-3 mb-3'>Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Fati el alami'
              className='w-full px-4 py-2 border rounded-lg'
              required
            />
            <label className='block text-sm font-medium mt-3 mb-3'>Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='w-full px-4 py-2 border rounded-lg'
              required
            />
            <label className='block text-sm font-medium mt-3 mb-3'>Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='***********'
              className='w-full px-4 py-2 border rounded-lg'
              required
            />
            <button 
              type='submit'
              className='w-full px-4 py-2 border rounded-lg bg-purple-600 text-white mt-5 hover:bg-red-600 cursor-pointer'>
              Register
            </button>
            <p className='text-center text-gray-600'>
              You already have an account?{' '}
              <Link to='/login' className='font-semibold hover:underline'>Login now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
