import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api';
export default function Login() {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError]=useState('')
  const navigate=useNavigate();

  const handleSubmit= (e)=>{
    e.preventDefault();
    setError('')

    if(!email || !password){
     setError('please fill in all fields');
     return;
    }
    login({ email,password}).then(()=>{navigate('/');}).catch(()=>{
      setError('Invalid email or password')
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className='w-full max-w-md bg-white p-8 rounded-xl'>
        <h1 className='text-2xl font-bold text-center mb-6'>
         Login
        </h1>
         {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block test-sm font-medium mt-3 mb-3'>Email</label>
            <input type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             placeholder='you@example.com'
             className='w-full px-4 py-2 border rounded-lg' required/>
             <label className='block test-sm font-medium mt-3 mb-3'>Password</label>
            <input type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder='***********'
             className='w-full px-4 py-2 border rounded-lg' required/>
             
             <button type='submit'
             className='w-full px-4 py-2 border rounded-lg bg-black text-white mt-5 hover:bg-red-600 cursor-pointer'>Log in
             </button>
             <p className='text-center text-gray-600'>Don't have an account?{' '}
              <Link to='/register' className='font-semibold hover:underline'>Register now</Link>

             </p>
          </div>
        </form>
      </div>

    </div>
  )
}
