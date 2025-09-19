import React from 'react';
import { FiX, FiDownload, FiFile, FiImage, FiFilm, FiFileText } from 'react-icons/fi';

const FilePreviewModal = ({ file, onClose }) => {
    if (!file) return null;

    const { secure_url: url, format, public_id, size: bytes } = file;
    const filename = public_id?.split('/').pop() || 'file';
    const ext = (format || '').replace('.', '').toLowerCase();
    const fileSize = bytes ? formatFileSize(bytes) : 'Unknown size';

    const fileTypes = {
        isPdf: ext === 'pdf',
        isImage: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext),
        isText: ['txt', 'csv', 'json', 'xml'].includes(ext),
        isDocLike: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext),
        isVideo: ['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext),
        isAudio: ['mp3', 'wav', 'ogg', 'aac'].includes(ext),
        isArchive: ['zip', 'rar', '7z', 'tar', 'gz'].includes(ext),
        isCode: ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss'].includes(ext),
    };

    function formatFileSize(bytes) {
        if (!bytes || isNaN(bytes)) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }


    // Get appropriate icon for file type
    const getFileIcon = () => {
        if (fileTypes.isImage) return <FiImage size={48} className="text-blue-400" />;
        if (fileTypes.isPdf) return <FiFileText size={48} className="text-red-400" />;
        if (fileTypes.isVideo) return <FiFilm size={48} className="text-purple-400" />;
        return <FiFile size={48} className="text-gray-400" />;
    };

    // Generate viewer URL based on file type
    const getViewerUrl = () => {
        const baseUrl = 'https://docs.google.com/gview?url=';
        if (fileTypes.isPdf && url.includes('cloudinary.com/raw/')) {
            return url;
        }
        return `${baseUrl}${encodeURIComponent(url)}&embedded=true`;
    };

    const renderPreviewContent = () => {
        if (fileTypes.isVideo) {
            return (
                <div className="flex flex-col items-center justify-center p-8 space-y-4">
                    {getFileIcon()}
                    <p className="text-lg text-gray-300">Video preview not available</p>
                    <p className="text-sm text-gray-400">
                        <div className="flex space-x-2 text-xs">
                            <span className="px-2 py-0.5 bg-gray-600 text-white rounded-full">
                                {format.toUpperCase()}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-600 text-white rounded-full">
                                {fileSize}
                            </span>
                        </div>

                    </p>
                </div>
            );
        }

        if (fileTypes.isImage) {
            return (
                <div className="flex justify-center items-center h-full">
                    <img
                        src={url.replace('/upload/', '/upload/q_auto,f_auto/')}
                        alt={filename}
                        className="max-w-full max-h-[80vh] rounded-lg object-contain"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = ''; 
                        }}
                    />
                </div>
            );
        }

        if (fileTypes.isPdf || fileTypes.isDocLike || fileTypes.isText) {
            return (
                <div className="flex flex-col h-full">
                    <iframe
                        src={getViewerUrl()}
                        title={`Preview of ${filename}`}
                        className="flex-grow w-full rounded-lg border-none bg-white"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                {getFileIcon()}
                <p className="text-lg text-gray-300">
                    Preview not available for <span className="font-medium">.{ext}</span> files
                </p>
                <p className="text-sm text-gray-400">
                    {filename}.{ext} • {fileSize}
                </p>
            </div>
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative w-full h-screen bg-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[100vh]">
                <div className="flex items-center justify-between p-4 bg-zinc-900 border-b border-gray-700">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="flex-shrink-0">
                            {getFileIcon()}
                        </div>
                        <div className="min-w-0">
                            <h2
                                id="modal-title"
                                className="text-lg font-medium text-white truncate"
                                title={filename}
                            >
                                {filename}
                            </h2>
                            <p className="text-xs text-gray-400">
                                {format.toUpperCase()} • {fileSize}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <a
                            href={url}
                            download={filename}
                            className="flex items-center px-3 py-2 space-x-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            aria-label={`Download ${filename}`}
                        >
                            <FiDownload size={16} />
                            <span>Download</span>
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Close preview"
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto bg-zinc-900">
                    {renderPreviewContent()}
                </div>

                <div className="p-3 text-xs text-gray-400 bg-gray-900 border-t border-gray-700">
                    <div className="flex justify-between">
                        <span>File ID: {public_id}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
