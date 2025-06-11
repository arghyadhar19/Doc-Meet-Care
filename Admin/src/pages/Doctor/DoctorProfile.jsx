import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, setDToken } = useContext(DoctorContext);
    const { currency, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const navigate = useNavigate();

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            };

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const deleteProfile = async () => {
        if (deleteConfirmText !== 'DELETE') {
            toast.error('Please type "DELETE" to confirm');
            return;
        }

        try {
            const { data } = await axios.delete(backendUrl + '/api/doctor/delete-profile', { 
                headers: { dToken } 
            });

            if (data.success) {
                toast.success('Profile deleted successfully');
                localStorage.removeItem('dToken');
                setDToken('');
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

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
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4 }
        }
    };

    return profileData && (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className='flex flex-col gap-4 m-5'>
                <motion.div whileHover={{ scale: 1.02 }}>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt='' />
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'
                >
                    <motion.p 
                        variants={itemVariants}
                        className='flex items-center gap-2 text-3xl font-medium text-gray-700'
                    >
                        {profileData.name}
                    </motion.p>
                    
                    <motion.div 
                        variants={itemVariants}
                        className='flex items-center gap-2 mt-1 text-gray-600'
                    >
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {isEdit ? (
                                <motion.textarea 
                                    whileFocus={{ scale: 1.02 }}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                    className='w-full outline-primary p-2 border rounded' 
                                    rows={8} 
                                    value={profileData.about} 
                                />
                            ) : (
                                profileData.about
                            )}
                        </p>
                    </motion.div>

                    <motion.p 
                        variants={itemVariants}
                        className='text-gray-600 font-medium mt-4'
                    >
                        Appointment fee: <span className='text-gray-800'>
                            {currency} {isEdit ? 
                                <motion.input 
                                    whileFocus={{ scale: 1.02 }}
                                    type='number' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                                    value={profileData.fees} 
                                    className='border rounded px-2 py-1 w-20'
                                /> : 
                                profileData.fees
                            }
                        </span>
                    </motion.p>

                    <motion.div variants={itemVariants} className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {isEdit ? 
                                <>
                                    <motion.input 
                                        whileFocus={{ scale: 1.02 }}
                                        type='text' 
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                        value={profileData.address.line1} 
                                        className='border rounded px-2 py-1 mb-2 w-full'
                                    />
                                    <br />
                                    <motion.input 
                                        whileFocus={{ scale: 1.02 }}
                                        type='text' 
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                        value={profileData.address.line2} 
                                        className='border rounded px-2 py-1 w-full'
                                    />
                                </> : 
                                <>
                                    {profileData.address.line1}
                                    <br />
                                    {profileData.address.line2}
                                </>
                            }
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className='flex gap-1 pt-2'>
                        <input 
                            type='checkbox' 
                            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                            checked={profileData.available}
                            disabled={!isEdit}
                        />
                        <label>Available</label>
                    </motion.div>

                    <motion.div variants={itemVariants} className='flex gap-2 mt-5 flex-wrap'>
                        {isEdit ? (
                            <>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={updateProfile} 
                                    className='px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all'
                                >
                                    Save
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEdit(false)} 
                                    className='px-4 py-1 border border-gray-400 text-sm rounded-full hover:bg-gray-400 hover:text-white transition-all'
                                >
                                    Cancel
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEdit(prev => !prev)} 
                                    className='px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all'
                                >
                                    Edit
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDeleteConfirm(true)} 
                                    className='px-4 py-1 border border-red-500 text-sm rounded-full hover:bg-red-500 hover:text-white transition-all'
                                >
                                    Delete Profile
                                </motion.button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
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
                            This action cannot be undone. This will permanently delete your doctor profile and all associated appointments.
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
                                onClick={deleteProfile}
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
    );
};

export default DoctorProfile;