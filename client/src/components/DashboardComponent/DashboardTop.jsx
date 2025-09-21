import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch, FiCamera } from 'react-icons/fi';
import Logo from '../../assets/Logo/CloudeskLogo.png';
import Avtar from '../../assets/AvtarImage/avtar.png';
import axiosInstance from '../../utils/axios/axiosInstance';
import { LogoutButton } from '../index';
import toast from 'react-hot-toast';
import { setSearchQuery } from '../../app/searchSlice';

const DashboardTop = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.search.query);


    useEffect(() => {
        if (userData) {
            setUser({
                userImage: userData?.avatar?.url,
                name: userData.name,
                email: userData.email,
            });
        }
    }, [userData]);

    const toggleMenu = () => {
        setisMenuOpen(!isMenuOpen);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const res = await axiosInstance.patch('/auth/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (res?.data?.avatar) {
                setUser((prev) => ({
                    ...prev,
                    userImage: res.data.avatar.url,
                }));
                toast.success(res?.data?.message || "Image updated Successfully")
            }
        } catch (err) {
            toast.error('Upload failed!');
            console.error('Error uploading avatar:', err.response?.data || err.message);
        }
    };

    return (
        <div className='w-full top-0 sticky flex items-center justify-between px-4 md:px-8 py-5 gap-5'>
            <img src={Logo} alt="Cloudesk" className='h-5 md:h-8 w-auto' />

            <div className='flex items-center gap-4'>
                {/* Search bar */}
                <div className="relative flex-grow w-full max-w-100">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-lg" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        className="w-full pl-8 md:pl-10 pr-4 py-3 rounded-md bg-gray-50 border border-gray-200 text-sm md:text-l outline-none transition-all"
                    />
                </div>

                {/* Profile image and dropdown */}
                <div className="relative flex-shrink-0">
                    <button
                        onClick={toggleMenu}
                        className="w-8 md:w-10 h-8 md:h-10 rounded-full overflow-hidden border-2 border-zinc-500"
                    >
                        <img
                            src={user?.userImage || Avtar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </button>

                    <div
                        className={`absolute right-0 mt-3 w-52 md:w-72 bg-white p-6 border border-gray-100 rounded-xl shadow-xl z-50 transition-all duration-300 transform origin-top-right ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                    >
                        {/* Avatar display and upload */}
                        <div className="relative p-4 border-b border-gray-100 flex justify-center">
                            <div className="relative">
                                <img
                                    src={user?.userImage || Avtar}
                                    alt="User"
                                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                                />
                                <button
                                    onClick={() => document.getElementById('fileInput').click()}
                                    className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 border border-blue-500 text-blue-600 hover:text-blue-700 shadow-md"
                                    style={{ transform: 'translate(25%, 25%)' }}
                                >
                                    <FiCamera size={18} />
                                </button>
                            </div>
                        </div>

                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <div className="text-center mt-4">
                            <p className="text-lg font-semibold text-zinc-800">{user?.name}</p>
                            <p className="text-md text-zinc-600">{user?.email}</p>
                        </div>

                        <ul className="pt-6 text-md">
                            <li>
                                <LogoutButton onClose={() => setisMenuOpen(false)} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTop;
