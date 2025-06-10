import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  return dashData && (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='m-5'
    >
      <motion.div 
        variants={containerVariants}
        className='flex flex-wrap gap-3'
      >
        <motion.div 
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'
        >
          <motion.img 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className='w-14' 
            src={assets.doctor_icon} 
            alt="" 
          />
          <div>
            <motion.p 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='text-xl font-semibold text-gray-600'
            >
              {dashData.doctors}
            </motion.p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'
        >
          <motion.img 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='w-14' 
            src={assets.appointments_icon} 
            alt="" 
          />
          <div>
            <motion.p 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='text-xl font-semibold text-gray-600'
            >
              {dashData.appointments}
            </motion.p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'
        >
          <motion.img 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='w-14' 
            src={assets.patients_icon} 
            alt="" 
          />
          <div>
            <motion.p 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='text-xl font-semibold text-gray-600'
            >
              {dashData.patients}
            </motion.p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={listVariants}
        className='bg-white'
      >
        <motion.div 
          variants={itemVariants}
          className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'
        >
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className='pt-4 border border-t-0'
        >
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                backgroundColor: '#f3f4f6',
                transition: { duration: 0.2 }
              }}
              className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'
            >
              <motion.img 
                whileHover={{ scale: 1.1 }}
                className='rounded-full w-10' 
                src={item.docData.image} 
                alt="" 
              />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <motion.img 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => cancelAppointment(item._id)} 
                  className='w-10 cursor-pointer' 
                  src={assets.cancel_icon} 
                  alt="" 
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard