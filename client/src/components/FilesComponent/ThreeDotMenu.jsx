import React, { useState, useEffect, useRef } from 'react';
import { FiDownload, FiStar, FiTrash, FiEye, FiMoreVertical } from 'react-icons/fi';
import { ConfirmModal } from '../../components';
import { downloadFile, toggleStarFile, deleteFile } from '../../utils/fileActions/fileActions'


const ThreeDotMenu = ({
    file,
    onView,
    isStarred = false,
    className = '',
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleView = () => {
        if (onView) onView();
        console.log(file);
        
        setIsMenuOpen(false);
    };

    const handleDownload = () => {
        downloadFile(file);
        setIsMenuOpen(false);
    };

    const handleStarred = () => {
        toggleStarFile(!isStarred);
        setIsMenuOpen(false);
    };

    const handleDeleteClick = () => {
        deleteFile(true);
        setIsMenuOpen(false);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setIsConfirmOpen(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
    };

    return (
        <div ref={menuRef}>
            <button
                className={`p-2 text-zinc-500 hover:text-gray-600 hover:bg-gray-200 rounded-full transition ${className}`}
                aria-label="More options"
                onClick={toggleMenu}
            >
                <FiMoreVertical size={18} />
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-48 text-sm text-gray-700 z-10 p-3">
                    <ul className="space-y-2">
                        <li
                            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                            onClick={handleView}
                        >
                            <FiEye size={16} className="mr-3" />
                            View
                        </li>
                        <li
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleDownload}
                        >
                            <FiDownload size={16} className="mr-3" />
                            Download
                        </li>
                        <li
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleStarred}
                        >
                            <FiStar size={16} className="mr-3" color={isStarred ? 'gold' : 'gray'} />
                            {isStarred ? 'Unstar' : 'Star'}
                        </li>
                        <li
                            className="flex items-center px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500"
                            onClick={handleDeleteClick}
                        >
                            <FiTrash size={16} className="mr-3" />
                            Delete
                        </li>
                    </ul>
                </div>
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this file? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default ThreeDotMenu;
