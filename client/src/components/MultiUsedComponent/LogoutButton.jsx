import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { logout } from '../../app/userSlice';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios/axiosInstance';

const LogoutButton = ({ onClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axiosInstance.get('/auth/logout');
            dispatch(logout());
            navigate('/');
            onClose();
            alert("Logged out");
        } catch (err) {
            console.error("Logout failed:", err);
            alert("Failed to logout. Please try again.");
        }
    };

    return (
        <button
            className="w-full px-4 py-2 rounded-md cursor-pointer text-left text-red-600 hover:bg-red-100 flex items-center gap-2"
            onClick={handleLogout}
        >
            <FiLogOut /> Logout
        </button>
    );
};

export default LogoutButton;
