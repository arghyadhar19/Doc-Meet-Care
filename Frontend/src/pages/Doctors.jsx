import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    let filteredDoctors = doctors

    // Filter by speciality
    if (speciality) {
      filteredDoctors = filteredDoctors.filter(doc => doc.speciality === speciality)
    }

    // Filter by search term
    if (searchTerm) {
      filteredDoctors = filteredDoctors.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.degree.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilterDoc(filteredDoctors)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, searchTerm])

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const filterVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const searchVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const specialities = [
    'General physician',
    'Gynecologist', 
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-gray-600'
      >
        Browse through the doctors specialist.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        variants={searchVariants}
        initial="hidden"
        animate="visible"
        className='mt-5 mb-5'
      >
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className='relative max-w-md'
        >
          <motion.input
            whileFocus={{ borderColor: '#5de1e7' }}
            type="text"
            placeholder="Search doctors by name, speciality, or degree..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300'
          />
          <motion.div
            animate={{ rotate: searchTerm ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            🔍
          </motion.div>
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchTerm('')}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              ✕
            </motion.button>
          )}
        </motion.div>
        
        {searchTerm && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-sm text-gray-500 mt-2'
          >
            {filterDoc.length} doctor{filterDoc.length !== 1 ? 's' : ''} found for "{searchTerm}"
          </motion.p>
        )}
      </motion.div>
      
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilter(!showFilter)} 
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
        >
          Filters
        </motion.button>

        <motion.div 
          variants={filterVariants}
          initial="hidden"
          animate="visible"
          className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate('/doctors')
              setSearchTerm('')
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${!speciality ? 'bg-[#E2E5FF] text-black' : 'hover:bg-gray-50'}`}
          >
            All Specialities
          </motion.p>
          
          {specialities.map((spec, index) => (
            <motion.p
              key={spec}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
                setSearchTerm('')
              }}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-[#E2E5FF] text-black' : 'hover:bg-gray-50'}`}
            >
              {spec}
            </motion.p>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='w-full grid grid-cols-auto gap-4 gap-y-6'
        >
          <AnimatePresence mode="wait">
            {filterDoc.length > 0 ? (
              filterDoc.map((item, index) => (
                <motion.div 
                  key={item._id}
                  variants={cardVariants}
                  layout
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                  className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                >
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className='bg-[#EAEFFF]' 
                    src={item.image} 
                    alt="" 
                  />
                  <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                      <motion.p 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}
                      ></motion.p>
                      <p>{item.available ? 'Available' : "Not Available"}</p>
                    </div>
                    <motion.p 
                      whileHover={{ color: '#5de1e7' }}
                      className='text-[#262626] text-lg font-medium'
                    >
                      {item.name}
                    </motion.p>
                    <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className='col-span-full text-center py-20'
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                  className='text-6xl mb-4'
                >
                  🔍
                </motion.div>
                <p className='text-gray-500 text-lg mb-2'>No doctors found</p>
                <p className='text-gray-400 text-sm mb-4'>
                  {searchTerm 
                    ? `Try searching with different keywords or clear the search filter.`
                    : `Try selecting a different speciality or clear all filters.`
                  }
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('')
                    navigate('/doctors')
                  }}
                  className='bg-primary text-white px-6 py-2 rounded-full'
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Doctors