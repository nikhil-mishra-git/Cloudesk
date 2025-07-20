import React from 'react';
import { FiX, FiDownload } from 'react-icons/fi';

const FilePreviewModal = ({ file, onClose }) => {
    if (!file) return null;

    // Extract Cloudinary details
    const { secure_url: url, format, public_id, resource_type } = file;
    const filename = public_id.split('/').pop();
    const ext = format.toLowerCase();

    // Check file type
    const isPdf = ext === 'pdf';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
    const isVideo = ['mp4', 'webm', 'ogg'].includes(ext);

    // Generate proper PDF viewer URL for Cloudinary
    const getPdfViewerUrl = () => {
        if (resource_type === 'raw') {
            // For raw PDFs, use Google Docs viewer as fallback
            return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
        }
        // For uploaded PDFs, use Cloudinary's viewer
        return `${url.replace('/upload/', '/upload/fl_sanitize/')}#toolbar=0&navpanes=0`;
    };

    // Render preview for each file type
    const renderPreview = () => {
        // Image preview
        if (isImage) {
            return (
                <img
                    src={url.replace('/upload/', '/upload/q_auto,f_auto/')}
                    alt={filename}
                    className="max-h-[70vh] w-auto rounded-md mx-auto"
                />
            );
        }

        // PDF preview
        if (isPdf) {
            return (
                <div className="w-full h-[70vh] flex flex-col">
                    <iframe
                        src={getPdfViewerUrl()}
                        title={filename}
                        className="flex-1 w-full rounded-md border"
                        loading="lazy"
                    />
                    <div className="mt-4 flex justify-end">
                        <a
                            href={url}
                            download={filename}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <FiDownload className="mr-2" />
                            Download PDF
                        </a>
                    </div>
                </div>
            );
        }

        // Video preview
        if (isVideo) {
            return (
                <div className="w-full h-[70vh] flex flex-col">
                    <video
                        controls
                        src={url}
                        className="flex-1 w-full rounded-md"
                        title={filename}
                        loading="lazy"
                    />
                    <div className="mt-4 flex justify-end">
                        <a
                            href={url}
                            download={filename}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <FiDownload className="mr-2" />
                            Download Video
                        </a>
                    </div>
                </div>
            );
        }

        // Unsupported format fallback
        return (
            <div className="text-center p-6">
                <div className="text-zinc-600 mb-4">
                    Preview not available for <strong>.{ext}</strong> files
                </div>
                <a
                    href={url}
                    download={filename}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FiDownload className="mr-2" />
                    Download File
                </a>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-zinc-800 truncate max-w-[80%]">
                        {filename}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-800 transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-auto">
                    {renderPreview()}
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-200 text-sm text-zinc-500">
                    <div className="flex justify-between">
                        <span>Format: {format.toUpperCase()}</span>
                        <span>Source: Cloudinary</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
