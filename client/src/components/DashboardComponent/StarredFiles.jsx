import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiGrid, FiList } from 'react-icons/fi';
import { useOutletContext } from 'react-router-dom';
import { EmptyState, DocumentCard, DocumentList } from '../../components';

const StarredFiles = ({ title = "Starred Files", onViewChange }) => {

    const [viewType, setViewType] = useState('grid');
    const allFiles = useSelector((state) => state.file.files);
    const searchQuery = useSelector((state) => state.search.query);
    const user = useSelector((state) => state.user.userData);
    const { onViewFile } = useOutletContext();

    const starredFiles = allFiles.filter(file =>
        file.starred &&
        file.filename?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewChange = (type) => {
        setViewType(type);
        if (onViewChange) onViewChange(type);
    };

    return (
        <div className="p-1.5 md:p-10">
            <div className="flex items-center justify-between mt-8">
                <h3 className="text-lg md:text-3xl font-semibold text-zinc-700">{title}</h3>
                <div className="flex items-center bg-gray-100 font-semibold rounded-md">
                    <button
                        onClick={() => handleViewChange('grid')}
                        className={`p-2 md:p-3 rounded-l-md transition cursor-pointer ${viewType === 'grid'
                            ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        title="Grid View"
                    >
                        <FiGrid size={16} />
                    </button>
                    <button
                        onClick={() => handleViewChange('list')}
                        className={`p-2 md:p-3 rounded-r-md transition cursor-pointer ${viewType === 'list'
                            ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        title="List View"
                    >
                        <FiList size={16} />
                    </button>
                </div>
            </div>

            {starredFiles.length === 0 ? (
                <div className="mt-16">
                    <EmptyState title="No Starred Files" subtitle="Files you mark as important will show up here." />
                </div>
            ) : viewType === 'grid' ? (
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {starredFiles.map((file) => (
                        <DocumentCard
                            key={file._id}
                            fileName={file.filename}
                            owner={user.name}
                            date={new Date(file.createdAt).toDateString()}
                            fileType={file.format}
                            file={file}
                            onViewFile={onViewFile}
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-10 space-y-6">
                    {starredFiles.map((file) => (
                        <DocumentList
                            key={file._id}
                            fileName={file.filename}
                            owner={user.name}
                            date={new Date(file.createdAt).toDateString()}
                            fileType={file.format}
                            file={file}
                            onViewFile={onViewFile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StarredFiles;
