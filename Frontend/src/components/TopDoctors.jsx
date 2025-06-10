import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

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

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'
        >
            <motion.h1 
                variants={cardVariants}
                className='text-3xl font-medium'
            >
                Top Doctors to Book
            </motion.h1>
            <motion.p 
                variants={cardVariants}
                className='sm:w-1/3 text-center text-sm'
            >
                Simply browse through our extensive list of trusted doctors.
            </motion.p>
            <motion.div 
                variants={containerVariants}
                className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'
            >
                {doctors.slice(0, 10).map((item, index) => (
                    <motion.div 
                        key={index}
                        variants={cardVariants}
                        whileHover={{ 
                            y: -10,
                            scale: 1.02,
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
                            <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <motion.button 
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'
            >
                more
            </motion.button>
        </motion.div>
    )
}

export default TopDoctors