import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'
    >
      <div className='flex items-center gap-2 text-xs'>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')} 
          className='w-36 sm:w-40 cursor-pointer' 
          src={assets.admin_logo} 
          alt="" 
        />
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'
        >
          {aToken ? 'Admin' : 'Doctor'}
        </motion.p>
      </div>
      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => logout()} 
        className='bg-primary text-white text-sm px-10 py-2 rounded-full'
      >
        Logout
      </motion.button>
    </motion.div>
  )
}

export default Navbar