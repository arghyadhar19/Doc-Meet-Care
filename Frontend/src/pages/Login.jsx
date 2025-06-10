import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <motion.form 
      onSubmit={onSubmitHandler} 
      className='min-h-[80vh] flex items-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'
      >
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-2xl font-semibold'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </motion.p>

        {state === 'Sign Up' && (
          <motion.div 
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className='w-full'
          >
            <p>Full Name</p>
            <motion.input 
              whileFocus={{ scale: 1.02 }}
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='border border-[#DADADA] rounded w-full p-2 mt-1' 
              type="text" 
              required 
            />
          </motion.div>
        )}

        <motion.div 
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: state === 'Sign Up' ? 0.5 : 0.4 }}
          className='w-full'
        >
          <p>Email</p>
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="email" 
            required 
          />
        </motion.div>

        <motion.div 
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: state === 'Sign Up' ? 0.6 : 0.5 }}
          className='w-full'
        >
          <p>Password</p>
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="password" 
            required 
          />
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'
        >
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {state === 'Sign Up' ? (
            <>
              Already have an account? 
              <motion.span 
                whileHover={{ scale: 1.05 }}
                onClick={() => setState('Login')} 
                className='text-primary underline cursor-pointer ml-1'
              >
                Login here
              </motion.span>
            </>
          ) : (
            <>
              Create a new account? 
              <motion.span 
                whileHover={{ scale: 1.05 }}
                onClick={() => setState('Sign Up')} 
                className='text-primary underline cursor-pointer ml-1'
              >
                Click here
              </motion.span>
            </>
          )}
        </motion.p>
      </motion.div>
    </motion.form>
  )
}

export default Login