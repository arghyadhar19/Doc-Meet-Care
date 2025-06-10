import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const menuVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    exit: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'
    >
      <motion.img 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')} 
        className='w-44 cursor-pointer' 
        src={assets.logo} 
        alt="" 
      />
      
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        {['/', '/doctors', '/about', '/contact'].map((path, index) => {
          const labels = ['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT']
          return (
            <motion.li
              key={path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <NavLink to={path}>
                <div className='py-1'>{labels[index]}</div>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
              </NavLink>
            </motion.li>
          )
        })}
        <motion.li
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ y: -2 }}
        >
          <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer">
            Admin Panel
          </a>
        </motion.li>
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className='flex items-center gap-2 cursor-pointer group relative'
          >
            <motion.img 
              whileHover={{ scale: 1.1 }}
              className='w-8 rounded-full' 
              src={userData.image} 
              alt="" 
            />
            <motion.img 
              animate={{ rotate: [0, 180, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className='w-2.5' 
              src={assets.dropdown_icon} 
              alt="" 
            />
            <motion.div 
              variants={dropdownVariants}
              initial="hidden"
              whileHover="visible"
              className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'
            >
              <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                <motion.p 
                  whileHover={{ x: 5, color: '#000' }}
                  onClick={() => navigate('/my-profile')} 
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </motion.p>
                <motion.p 
                  whileHover={{ x: 5, color: '#000' }}
                  onClick={() => navigate('/my-appointments')} 
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </motion.p>
                <motion.p 
                  whileHover={{ x: 5, color: '#000' }}
                  onClick={logout} 
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')} 
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create account
          </motion.button>
        )}
        
        <motion.img 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowMenu(true)} 
          className='w-6 md:hidden' 
          src={assets.menu_icon} 
          alt="" 
        />

        {/* ---- Mobile Menu ---- */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className='md:hidden fixed w-full right-0 top-0 bottom-0 z-20 bg-white'
            >
              <div className='flex items-center justify-between px-5 py-6'>
                <img src={assets.logo} className='w-36' alt="" />
                <motion.img 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(false)} 
                  src={assets.cross_icon} 
                  className='w-7' 
                  alt="" 
                />
              </div>
              <motion.ul 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'
              >
                {[
                  { path: '/', label: 'HOME' },
                  { path: '/doctors', label: 'ALL DOCTORS' },
                  { path: '/about', label: 'ABOUT' },
                  { path: '/contact', label: 'CONTACT' }
                ].map((item, index) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavLink onClick={() => setShowMenu(false)} to={item.path}>
                      <p className='px-4 py-2 rounded full inline-block'>{item.label}</p>
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Navbar