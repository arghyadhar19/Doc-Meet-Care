import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
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
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        variants={itemVariants}
        className='text-center text-2xl pt-10 text-[#707070]'
      >
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className='my-10 flex flex-col md:flex-row gap-12'
      >
        <motion.img 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className='w-full md:max-w-[360px]' 
          src={assets.about_image} 
          alt="" 
        />
        <motion.div 
          variants={containerVariants}
          className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'
        >
          <motion.p variants={itemVariants}>
            Welcome to DocMeet, your trusted partner in managing your healthcare needs conveniently and efficiently. At DocMeet, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </motion.p>
          <motion.p variants={itemVariants}>
            DocMeet is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DocMeet is here to support you every step of the way.
          </motion.p>
          <motion.b 
            variants={itemVariants}
            className='text-gray-800'
          >
            Our Vision
          </motion.b>
          <motion.p variants={itemVariants}>
            Our vision at DocMeet is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className='text-xl my-4'
      >
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className='flex flex-col md:flex-row mb-20'
      >
        {[
          {
            title: 'EFFICIENCY:',
            description: 'Streamlined appointment scheduling that fits into your busy lifestyle.'
          },
          {
            title: 'CONVENIENCE:',
            description: 'Access to a network of trusted healthcare professionals in your area.'
          },
          {
            title: 'PERSONALIZATION:',
            description: 'Tailored recommendations and reminders to help you stay on top of your health.'
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              backgroundColor: '#5de1e7',
              color: '#ffffff',
              transition: { duration: 0.3 }
            }}
            className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'
          >
            <b>{item.title}</b>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default About