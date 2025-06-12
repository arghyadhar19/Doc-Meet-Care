import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

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
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'
            >
                My appointments
            </motion.p>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className=''
            >
                <AnimatePresence>
                    {appointments.map((item, index) => (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            layout
                            whileHover={{ 
                                scale: 1.02,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                transition: { duration: 0.3 }
                            }}
                            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b hover:bg-gray-50 transition-all duration-300 rounded-lg px-2'
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img className='w-36 bg-[#EAEFFF] rounded-lg' src={item.docData.image} alt="" />
                            </motion.div>
                            
                            <motion.div 
                                variants={itemVariants}
                                className='flex-1 text-sm text-[#5E5E5E]'
                            >
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className='text-[#262626] text-base font-semibold'
                                >
                                    {item.docData.name}
                                </motion.p>
                                
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {item.docData.speciality}
                                </motion.p>
                                
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className='text-[#464646] font-medium mt-1'
                                >
                                    Address:
                                </motion.p>
                                
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className=''
                                >
                                    {item.docData.address.line1}
                                </motion.p>
                                
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className=''
                                >
                                    {item.docData.address.line2}
                                </motion.p>
                                
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className=' mt-1'
                                >
                                    <span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}
                                </motion.p>
                            </motion.div>
                            
                            <div></div>
                            
                            <motion.div 
                                variants={containerVariants}
                                className='flex flex-col gap-2 justify-end text-sm text-center'
                            >
                                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && 
                                    <motion.button 
                                        variants={buttonVariants}
                                        whileHover={{ 
                                            scale: 1.05,
                                            backgroundColor: '#5de1e7',
                                            color: '#ffffff'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setPayment(item._id)} 
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                                    >
                                        Pay Online
                                    </motion.button>
                                }
                                
                                {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && 
                                    <motion.button 
                                        variants={buttonVariants}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => appointmentRazorpay(item._id)} 
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'
                                    >
                                        <motion.img 
                                            whileHover={{ scale: 1.1 }}
                                            className='max-w-20 max-h-5' 
                                            src={assets.razorpay_logo} 
                                            alt="" 
                                        />
                                    </motion.button>
                                }
                                
                                {!item.cancelled && item.payment && !item.isCompleted && 
                                    <motion.button 
                                        variants={buttonVariants}
                                        animate={{ 
                                            backgroundColor: ['#EAEFFF', '#d4edda', '#EAEFFF'],
                                            transition: { duration: 2, repeat: Infinity }
                                        }}
                                        className='sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]'
                                    >
                                        Paid
                                    </motion.button>
                                }

                                {item.isCompleted && 
                                    <motion.button 
                                        variants={buttonVariants}
                                        animate={{ 
                                            scale: [1, 1.05, 1],
                                            transition: { duration: 2, repeat: Infinity }
                                        }}
                                        className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'
                                    >
                                        Completed
                                    </motion.button>
                                }

                                {!item.cancelled && !item.isCompleted && 
                                    <motion.button 
                                        variants={buttonVariants}
                                        whileHover={{ 
                                            scale: 1.05,
                                            backgroundColor: '#dc3545',
                                            color: '#ffffff'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => cancelAppointment(item._id)} 
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                                    >
                                        Cancel appointment
                                    </motion.button>
                                }
                                
                                {item.cancelled && !item.isCompleted && 
                                    <motion.button 
                                        variants={buttonVariants}
                                        animate={{ 
                                            opacity: [0.7, 1, 0.7],
                                            transition: { duration: 2, repeat: Infinity }
                                        }}
                                        className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'
                                    >
                                        Appointment cancelled
                                    </motion.button>
                                }
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {appointments.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='text-center py-20'
                    >
                        <motion.div
                            animate={{ 
                                y: [0, -10, 0],
                                transition: { duration: 2, repeat: Infinity }
                            }}
                            className='text-6xl mb-4'
                        >
                            📅
                        </motion.div>
                        <p className='text-gray-500 text-lg'>No appointments found</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/doctors')}
                            className='mt-4 bg-primary text-white px-6 py-2 rounded-full'
                        >
                            Book an Appointment
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}

export default MyAppointments