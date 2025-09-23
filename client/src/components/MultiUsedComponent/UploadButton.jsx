import React, { useRef, useState } from 'react';
import {
    FiUploadCloud, FiX, FiFileText, FiImage,
    FiVideo, FiFile, FiUpload
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import api from '../../utils/axios/api';
import { refreshFiles } from '../../utils/fileActions/fileActions';
import toast from 'react-hot-toast';

const getFileIcon = (extension) => {
    const ext = extension.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) return <FiImage size={32} className="text-blue-500" />;
    if (['mp4', 'mov', 'avi'].includes(ext)) return <FiVideo size={32} className="text-red-500" />;
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) return <FiFileText size={32} className="text-green-600" />;
    return <FiFile size={32} className="text-gray-400" />;
};

const UploadButton = ({ className = '' }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fullName = file.name;
        const dotIndex = fullName.lastIndexOf('.');
        const name = dotIndex !== -1 ? fullName.substring(0, dotIndex) : fullName;
        const extension = dotIndex !== -1 ? fullName.substring(dotIndex + 1) : '';

        setFileData({ file, name, extension });
        setModalOpen(true);
    };

    const handleNameChange = (e) => {
        setFileData((prev) => ({ ...prev, name: e.target.value }));
    };

    const closeModal = () => {
        setModalOpen(false);
        setFileData(null);
        fileInputRef.current.value = '';
    };

    const handleUpload = async () => {
        if (!fileData) return;

        const newFileName = fileData.extension
            ? `${fileData.name}.${fileData.extension}`
            : fileData.name;

        const formData = new FormData();
        formData.append('file', fileData.file, newFileName);

        setUploading(true);
        try {
            await api.files.upload(formData)
            await refreshFiles(dispatch)
            closeModal();
            toast.success("File uploded successfully")
        } catch (err) {
            console.error('Upload failed:', err);
            alert(err?.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleButtonClick}
                className={`flex items-center gap-3 px-3 md:px-5 py-3 md:py-4 rounded-lg bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm hover:bg-blue-200 transition cursor-pointer ${className}`}
            >
                <FiUploadCloud className="text-lg" />
                <span>Upload File</span>
            </button>

            <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.zip,.rar,image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {modalOpen && fileData && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md relative border border-zinc-200">

                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 text-zinc-500 hover:text-zinc-700 transition"
                            title="Close"
                        >
                            <FiX size={20} />
                        </button>

                        {/* Heading */}
                        <h2 className="text-xl font-semibold text-zinc-800 mb-4">Confirm Upload</h2>

                        {/* File Preview */}
                        <div className="flex items-center gap-4 mb-6 p-3 bg-zinc-50 rounded-md">
                            <div className="bg-white p-2 rounded-md shadow-sm">
                                {getFileIcon(fileData.extension)}
                            </div>
                            <div className="text-sm text-zinc-600 truncate max-w-[70%]">
                                {fileData.file.name}
                            </div>
                        </div>

                        {/* File Name Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-zinc-700 mb-2">File Name</label>
                            <input
                                type="text"
                                value={fileData.name}
                                onChange={handleNameChange}
                                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>

                        {/* File Extension */}
                        <div className="text-sm text-zinc-500 mb-6">
                            <span className="font-medium">Extension:</span> .{fileData.extension}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-zinc-600 bg-white hover:bg-zinc-50 rounded-md border border-zinc-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition flex items-center gap-2 disabled:opacity-50"
                            >
                                <FiUpload size={16} />
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UploadButton;
