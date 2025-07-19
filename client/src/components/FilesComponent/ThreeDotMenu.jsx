import React, { useState } from 'react';
import { FiDownload, FiStar, FiTrash, FiEye } from 'react-icons/fi';
import { FiMoreVertical } from 'react-icons/fi';

const ThreeDotMenu = ({ className, ...props }) => { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    
    const handleView = () => {
        alert('View option clicked');
        // Add functionality for viewing the document
    };

    const handleDownload = () => {
        alert('Download option clicked');
        // Add functionality for downloading the document
    };

    const handleStarred = () => {
        setIsStarred(!isStarred);
        alert(isStarred ? 'Removed from starred' : 'Added to starred');
    };

    const handleDelete = () => {
        alert('Delete option clicked');
        // Add functionality for deleting the document
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="">

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
                            onClick={handleDelete}
                        >
                            <FiTrash size={16} className="mr-3" />
                            Delete
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ThreeDotMenu;
