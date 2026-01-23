import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api';
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [error, setError]=useState('')
  const navigate=useNavigate();

export default function Register() {
     const handleSubmit= (e)=>{
        e.preventDefault();
        setError('')
    
        if(!email || !password || confirmPassword){
         setError('please fill in all fields');
         return;
        }
        register({ email,password}).then(()=>{navigate('/');}).catch(()=>{
          setError('Invalid email or password')
        })
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className='w-full max-w-md bg-white p-8 rounded-xl'>
        <h1 className='text-2xl font-bold text-center mb-6'>
         Register
        </h1>
        <form className='space-y-4'>
          <div>
            <label className='block test-sm font-medium mt-3 mb-3'>Name</label>
            <input type="name"
             placeholder='Fati el alami'
             className='w-full px-4 py-2 border rounded-lg' />
            <label className='block test-sm font-medium mt-3 mb-3'>Email</label>
            <input type="email"
             placeholder='you@example.com'
             className='w-full px-4 py-2 border rounded-lg' />
             <label className='block test-sm font-medium mt-3 mb-3'>Password</label>
            <input type="password"
             placeholder='***********'
             className='w-full px-4 py-2 border rounded-lg' />
             <label className='block test-sm font-medium mt-3 mb-3'>Confirm Password</label>
              <input type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder='***********'
               className='w-full px-4 py-2 border rounded-lg' required/>
             <button type='submit'
             className='w-full px-4 py-2 border rounded-lg bg-black text-white mt-5 hover:bg-red-600 cursor-pointer'>Log in
             </button>
             <p className='text-center text-gray-600'>You already have an account?{' '}
              <Link to='/login' className='font-semibold hover:underline'>Login now</Link>

             </p>
          </div>
        </form>
      </div>

    </div>
  )
}
