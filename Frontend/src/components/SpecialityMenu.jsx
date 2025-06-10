import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SpecialityMenu = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            id='speciality' 
            className='flex flex-col items-center gap-4 py-16 text-[#262626]'
        >
            <motion.h1 
                variants={itemVariants}
                className='text-3xl font-medium'
            >
                Find by Speciality
            </motion.h1>
            <motion.p 
                variants={itemVariants}
                className='sm:w-1/3 text-center text-sm'
            >
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </motion.p>
            <motion.div 
                variants={containerVariants}
                className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'
            >
                {specialityData.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ 
                            y: -10,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            to={`/doctors/${item.speciality}`} 
                            onClick={() => scrollTo(0, 0)} 
                            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
                        >
                            <motion.img 
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className='w-16 sm:w-24 mb-2' 
                                src={item.image} 
                                alt="" 
                            />
                            <p>{item.speciality}</p>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default SpecialityMenu