import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {
      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }
    }
  }

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
          className='text-2xl font-semibold m-auto'
        >
          <span className='text-primary'>{state}</span> Login
        </motion.p>

        <motion.div 
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
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
          transition={{ delay: 0.5 }}
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
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='bg-primary text-white w-full py-2 rounded-md text-base'
        >
          Login
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {state === 'Admin' ? (
            <p>
              Doctor Login? 
              <motion.span 
                whileHover={{ scale: 1.05 }}
                onClick={() => setState('Doctor')} 
                className='text-primary underline cursor-pointer ml-1'
              >
                Click here
              </motion.span>
            </p>
          ) : (
            <p>
              Admin Login? 
              <motion.span 
                whileHover={{ scale: 1.05 }}
                onClick={() => setState('Admin')} 
                className='text-primary underline cursor-pointer ml-1'
              >
                Click here
              </motion.span>
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.form>
  )
}

export default Login