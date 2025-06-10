import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  }

  const adminLinks = [
    { to: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { to: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { to: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { to: '/doctor-list', icon: assets.people_icon, label: 'Doctors List' }
  ]

  const doctorLinks = [
    { to: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { to: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { to: '/doctor-profile', icon: assets.people_icon, label: 'Profile' }
  ]

  return (
    <motion.div 
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className='min-h-screen bg-white border-r'
    >
      {aToken && (
        <motion.ul className='text-[#515151] mt-5'>
          {adminLinks.map((link, index) => (
            <motion.li key={link.to} variants={itemVariants}>
              <NavLink 
                to={link.to} 
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : 'hover:bg-gray-50'}`}
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  className='min-w-5' 
                  src={link.icon} 
                  alt='' 
                />
                <p className='hidden md:block'>{link.label}</p>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {dToken && (
        <motion.ul className='text-[#515151] mt-5'>
          {doctorLinks.map((link, index) => (
            <motion.li key={link.to} variants={itemVariants}>
              <NavLink 
                to={link.to} 
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : 'hover:bg-gray-50'}`}
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  className='min-w-5' 
                  src={link.icon} 
                  alt='' 
                />
                <p className='hidden md:block'>{link.label}</p>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  )
}

export default Sidebar