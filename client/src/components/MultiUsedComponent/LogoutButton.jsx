import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { logout } from '../../app/userSlice';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios/axiosInstance';
import toast from 'react-hot-toast';
import { ConfirmModal } from '../../components';

const LogoutButton = ({ onClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [confirmProps, setConfirmProps] = useState({
        title: '',
        message: '',
        confirmLabel: '',
        onConfirm: () => { },
    });

    const handleLogout = async () => {
        try {
            await axiosInstance.get('/auth/logout');
            dispatch(logout());
            navigate('/');
            onClose();
            toast.success("Logged out");
        } catch (err) {
            console.error("Logout failed:", err);
            toast.error("Failed to logout. Please try again.");
        }
    };

    return (
        <>
            <button
                className="w-full px-4 py-2 rounded-md cursor-pointer text-left text-red-600 hover:bg-red-100 flex items-center gap-2"
                onClick={handleLogout}
            >
                <FiLogOut /> Logout
            </button>

            <ConfirmModal
                isOpen={isConfirmOpen}
                title={confirmProps.title}
                message={confirmProps.message}
                confirmLabel={confirmProps.confirmLabel}
                cancelLabel="Cancel"
                onConfirm={() => {
                    confirmProps.onConfirm();
                    setIsConfirmOpen(false);
                }}
                className={confirmProps.className}
                onCancel={() => setIsConfirmOpen(false)}
            />

        </>
    );
};

export default LogoutButton;
