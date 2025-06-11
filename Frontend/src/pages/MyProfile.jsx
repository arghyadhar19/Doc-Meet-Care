import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState('')

    const { token, backendUrl, userData, setUserData, loadUserProfileData, setToken } = useContext(AppContext)
    const navigate = useNavigate()

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to delete user profile
    const deleteUserProfile = async () => {
        if (deleteConfirmText !== 'DELETE') {
            toast.error('Please type "DELETE" to confirm')
            return
        }

        try {
            const { data } = await axios.delete(backendUrl + '/api/user/delete-profile', { 
                headers: { token } 
            })

            if (data.success) {
                toast.success('Profile deleted successfully')
                localStorage.removeItem('token')
                setToken(false)
                navigate('/login')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const containerVariants = {
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
            transition: { duration: 0.4 }
        }
    }

    return userData ? (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='max-w-lg flex flex-col gap-2 text-sm pt-5'
        >
            <motion.div variants={itemVariants}>
                {isEdit
                    ? <label htmlFor='image' >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className='inline-block relative cursor-pointer'
                        >
                            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                        </motion.div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                    : <motion.img 
                        whileHover={{ scale: 1.05 }}
                        className='w-36 rounded' 
                        src={userData.image} 
                        alt="" 
                    />
                }
            </motion.div>

            <motion.div variants={itemVariants}>
                {isEdit
                    ? <motion.input 
                        whileFocus={{ scale: 1.02 }}
                        className='bg-gray-50 text-3xl font-medium max-w-60' 
                        type="text" 
                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                        value={userData.name} 
                    />
                    : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
                }
            </motion.div>

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            <motion.div variants={itemVariants}>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>

                    {isEdit
                        ? <motion.input 
                            whileFocus={{ scale: 1.02 }}
                            className='bg-gray-50 max-w-52' 
                            type="text" 
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                            value={userData.phone} 
                        />
                        : <p className='text-blue-500'>{userData.phone}</p>
                    }

                    <p className='font-medium'>Address:</p>

                    {isEdit
                        ? <p>
                            <motion.input 
                                whileFocus={{ scale: 1.02 }}
                                className='bg-gray-50' 
                                type="text" 
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                value={userData.address.line1} 
                            />
                            <br />
                            <motion.input 
                                whileFocus={{ scale: 1.02 }}
                                className='bg-gray-50' 
                                type="text" 
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                value={userData.address.line2} 
                            />
                        </p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>

                    {isEdit
                        ? <motion.select 
                            whileFocus={{ scale: 1.02 }}
                            className='max-w-20 bg-gray-50' 
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                            value={userData.gender} 
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </motion.select>
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }

                    <p className='font-medium'>Birthday:</p>

                    {isEdit
                        ? <motion.input 
                            whileFocus={{ scale: 1.02 }}
                            className='max-w-28 bg-gray-50' 
                            type='date' 
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                            value={userData.dob} 
                        />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className='mt-10 flex gap-3 flex-wrap'>
                {isEdit ? (
                    <>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={updateUserProfileData} 
                            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                        >
                            Save information
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEdit(false)} 
                            className='border border-gray-400 px-8 py-2 rounded-full hover:bg-gray-400 hover:text-white transition-all'
                        >
                            Cancel
                        </motion.button>
                    </>
                ) : (
                    <>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEdit(true)} 
                            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                        >
                            Edit
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowDeleteConfirm(true)} 
                            className='border border-red-500 px-8 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all'
                        >
                            Delete Profile
                        </motion.button>
                    </>
                )}
            </motion.div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className='bg-white p-6 rounded-lg max-w-md w-full mx-4'
                    >
                        <h3 className='text-lg font-semibold mb-4 text-red-600'>Delete Profile</h3>
                        <p className='text-gray-600 mb-4'>
                            This action cannot be undone. This will permanently delete your account and all associated data.
                        </p>
                        <p className='text-sm text-gray-500 mb-4'>
                            Type <strong>DELETE</strong> to confirm:
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            className='w-full border border-gray-300 rounded px-3 py-2 mb-4'
                            placeholder='Type DELETE here'
                        />
                        <div className='flex gap-3'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={deleteUserProfile}
                                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all'
                            >
                                Delete Profile
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setShowDeleteConfirm(false)
                                    setDeleteConfirmText('')
                                }}
                                className='border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition-all'
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    ) : null
}

export default MyProfile