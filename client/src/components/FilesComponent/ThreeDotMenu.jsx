import React, { useState, useEffect, useRef } from 'react';
import {
    FiDownload,
    FiStar,
    FiTrash,
    FiEye,
    FiMoreVertical,
    FiCornerUpLeft
} from 'react-icons/fi';
import { ConfirmModal } from '../../components';
import {
    downloadFile,
    toggleStarFile,
    deleteFile,
    restoreFile,
    finalDelete,
    refreshFiles
} from '../../utils/fileActions/fileActions';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../utils/axios/api';

const ThreeDotMenu = ({ file, onView, className = '' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [starred, setStarred] = useState(file.starred);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const menuRef = useRef(null);
    const trashed = file.deleted;
    const dispatch = useDispatch()

    const [confirmProps, setConfirmProps] = useState({
        title: '',
        message: '',
        confirmLabel: '',
        onConfirm: () => { },
    });

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

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const handleView = () => {
        onView?.(file.secure_url);
        setIsMenuOpen(false);
    };

    const handleDownload = () => {
        try {
            downloadFile(file);
            toast.success('File downloaded successfully!');
        } catch (err) {
            toast.error('Failed to download file.');
            console.error(err);
        }
        setIsMenuOpen(false);
    };

    const handleStarred = async () => {
        const newStarred = !starred;
        try {
            const updatedStarred = await toggleStarFile(file._id, newStarred);
            setStarred(updatedStarred);
            toast.success(`File ${newStarred ? 'starred' : 'unstarred'} successfully!`);
            await refreshFiles(dispatch)
        } catch (err) {
            toast.error('Failed to toggle star status.');
            console.error(err);
        }
        setIsMenuOpen(false);
    };

    const handleSoftDelete = () => {
        setConfirmProps({
            title: 'Move to Trash?',
            message: 'Are you sure you want to move this file to trash?',
            confirmLabel: 'Move to Trash',
            onConfirm: async () => {
                try {
                    await deleteFile(file._id);
                    toast.success("File moved to trash")
                    await refreshFiles(dispatch)
                } catch (err) {
                    console.error(err);
                    toast.error("Failed to move file")
                }
            },
        });
        setIsConfirmOpen(true);
        setIsMenuOpen(false);
    };

    const handleRestore = () => {
        setConfirmProps({
            title: 'Restore File?',
            message: 'Are you sure you want to restore this file?',
            confirmLabel: 'Restore File',
            className: 'bg-green-600 hover:bg-green-700',
            onConfirm: async () => {
                try {
                    await restoreFile(file._id);
                    await refreshFiles(dispatch)
                    toast.success("File restored")
                } catch (err) {
                    console.error(err);
                    toast.error("Failed to restore")
                }
            },
        });
        setIsConfirmOpen(true);
        setIsMenuOpen(false);
    };

    const handlePermanentDelete = () => {
        setConfirmProps({
            title: 'Delete Permanently?',
            message: 'Do you want to permanently delete this file?',
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await toast.promise(
                        finalDelete(file._id),
                        {
                            loading: 'Deleting file...',
                            success: 'File deleted successfully!',
                            error: 'Failed to delete file.',
                        }
                    );
                    await refreshFiles(dispatch);
                } catch (err) {
                    console.error(err);
                }
            },
        });
        setIsConfirmOpen(true);
        setIsMenuOpen(false);
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
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={handleView}>
                            <FiEye size={16} className="mr-3" />
                            View
                        </li>
                        {!trashed && (
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDownload}>
                                <FiDownload size={16} className="mr-3" />
                                Download
                            </li>
                        )}
                        {!trashed && (
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleStarred}>
                                <FiStar size={16} className="mr-3" color={starred ? 'gold' : 'gray'} />
                                {starred ? 'Unstar' : 'Star'}
                            </li>
                        )}
                        {trashed && (
                            <li className="flex items-center px-4 py-2 hover:bg-green-100 cursor-pointer text-green-600" onClick={handleRestore}>
                                <FiCornerUpLeft size={16} className="mr-3" />
                                Restore
                            </li>
                        )}
                        <li
                            className="flex items-center px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500"
                            onClick={trashed ? handlePermanentDelete : handleSoftDelete}
                        >
                            <FiTrash size={16} className="mr-3" />
                            {trashed ? "Delete" : "Trash"}
                        </li>
                    </ul>
                </div>
            )}

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
        </div>
    );
};

export default ThreeDotMenu;
