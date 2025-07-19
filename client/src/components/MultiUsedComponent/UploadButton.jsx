import React, { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { FiFileText, FiFile, FiXCircle, FiUpload } from 'react-icons/fi';


const UploadButton = ({ onUpload, className = '', ...props }) => {
    const fileInputRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [fileData, setFileData] = useState(null); // { file, name, extension }

    // Open file dialog
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    // File select handler
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Extract name and extension
        const fullName = file.name;
        const dotIndex = fullName.lastIndexOf('.');
        const name = dotIndex !== -1 ? fullName.substring(0, dotIndex) : fullName;
        const extension = dotIndex !== -1 ? fullName.substring(dotIndex + 1) : '';

        setFileData({ file, name, extension });
        setModalOpen(true);
    };

    // Handle filename edit
    const handleNameChange = (e) => {
        setFileData((prev) => ({
            ...prev,
            name: e.target.value,
        }));
    };

    // Upload button in modal
    const handleUpload = () => {
        if (!fileData) return;

        // You can handle the upload logic here:
        // For example, create a new File with updated name + extension, or pass file & new name up

        const newFileName = fileData.extension
            ? `${fileData.name}.${fileData.extension}`
            : fileData.name;

        console.log('Uploading file:', {
            originalFile: fileData.file,
            newFileName,
        });

        // Call parent upload handler if passed
        if (onUpload) {
            onUpload(fileData.file, newFileName);
        }

        // Close modal and clear state
        setModalOpen(false);
        setFileData(null);
        fileInputRef.current.value = '';
    };

    // Modal close handler
    const closeModal = () => {
        setModalOpen(false);
        setFileData(null);
        fileInputRef.current.value = '';
    };

    return (
        <>
            <button
                type="button"
                onClick={handleButtonClick}
                className={`flex items-center gap-3 px-5 py-4 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm hover:bg-blue-200 transition cursor-pointer ${className}`}
                {...props}
            >
                <FiUploadCloud className="text-lg" />
                <span>Upload File</span>
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirm Upload</h2>

                        <label className="block mb-2 font-medium text-gray-700">File Name</label>
                        <input
                            type="text"
                            value={fileData?.name || ''}
                            onChange={handleNameChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />

                        

                    </div>
                </div>
            )}
        </>
    );
};

export default UploadButton;
