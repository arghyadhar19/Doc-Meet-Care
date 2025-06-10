import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Contact = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
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
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'
      >
        <motion.img 
          variants={imageVariants}
          whileHover={{ 
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.3 }
          }}
          className='w-full md:max-w-[360px]' 
          src={assets.contact_image} 
          alt="" 
        />
        
        <motion.div 
          variants={containerVariants}
          className='flex flex-col justify-center items-start gap-6'
        >
          <motion.p 
            variants={textVariants}
            whileHover={{ x: 5 }}
            className='font-semibold text-lg text-gray-600'
          >
            OUR OFFICE
          </motion.p>
          
          <motion.p 
            variants={textVariants}
            whileHover={{ x: 5, color: '#5de1e7' }}
            transition={{ duration: 0.3 }}
            className='text-gray-500'
          >
            712109 Chuchura Station <br /> 
            Jivanalaya, Haridradanga,Chandannagar 712136, <br />
            West Bengal, India
          </motion.p>
          
          <motion.div
            variants={textVariants}
            className='space-y-2'
          >
            <motion.p 
              whileHover={{ x: 5, color: '#5de1e7' }}
              transition={{ duration: 0.3 }}
              className='text-gray-500'
            >
              Tel: (415) 555-0132
            </motion.p>
            <motion.p 
              whileHover={{ x: 5, color: '#5de1e7' }}
              transition={{ duration: 0.3 }}
              className='text-gray-500'
            >
              Email: arghyaarunima@gmail.com
            </motion.p>
          </motion.div>
          
          <motion.p 
            variants={textVariants}
            whileHover={{ x: 5 }}
            className='font-semibold text-lg text-gray-600'
          >
            CAREERS AT DocMeet
          </motion.p>
          
          <motion.p 
            variants={textVariants}
            whileHover={{ x: 5, color: '#5de1e7' }}
            transition={{ duration: 0.3 }}
            className='text-gray-500'
          >
            Learn more about our teams and job openings.
          </motion.p>
          
          <motion.button 
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#000',
              color: '#fff',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        variants={containerVariants}
        className='bg-gray-50 rounded-lg p-8 mb-20'
      >
        <motion.h2 
          variants={itemVariants}
          className='text-2xl font-semibold text-center mb-8 text-gray-700'
        >
          Get In Touch
        </motion.h2>
        
        <motion.form 
          variants={containerVariants}
          className='max-w-lg mx-auto space-y-6'
        >
          <motion.div variants={itemVariants}>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Full Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: '#5de1e7' }}
              type='text'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300'
              placeholder='Enter your full name'
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: '#5de1e7' }}
              type='email'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300'
              placeholder='Enter your email'
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Phone Number
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: '#5de1e7' }}
              type='tel'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300'
              placeholder='Enter your phone number'
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Message
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02, borderColor: '#5de1e7' }}
              rows={5}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300 resize-none'
              placeholder='Tell us how we can help you...'
            />
          </motion.div>
          
          <motion.button
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#4dd4da'
            }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            className='w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300'
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Map Section */}
      <motion.div
        variants={containerVariants}
        className='mb-20'
      >
        <motion.h2 
          variants={itemVariants}
          className='text-2xl font-semibold text-center mb-8 text-gray-700'
        >
          Find Us Here
        </motion.h2>
        
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className='bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500'
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className='text-center'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4'
            />
            <p>Interactive Map Loading...</p>
            <p className='text-sm mt-2'>Chandannagar, West Bengal, India</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quick Contact Cards */}
      <motion.div
        variants={containerVariants}
        className='grid md:grid-cols-3 gap-6 mb-20'
      >
        {[
          {
            icon: '📞',
            title: 'Call Us',
            content: '(415) 555-0132',
            subtitle: 'Mon-Fri 9AM-6PM'
          },
          {
            icon: '✉️',
            title: 'Email Us',
            content: 'arghyaarunima@gmail.com',
            subtitle: 'We reply within 24hrs'
          },
          {
            icon: '📍',
            title: 'Visit Us',
            content: 'Chandannagar, WB',
            subtitle: 'Open Mon-Sat'
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
            className='bg-white p-6 rounded-lg shadow-md text-center border border-gray-100'
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              className='text-3xl mb-4'
            >
              {item.icon}
            </motion.div>
            <h3 className='font-semibold text-lg mb-2 text-gray-700'>{item.title}</h3>
            <p className='text-primary font-medium mb-1'>{item.content}</p>
            <p className='text-sm text-gray-500'>{item.subtitle}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Contact