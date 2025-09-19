import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiGrid, FiList } from 'react-icons/fi';
import { useOutletContext } from 'react-router-dom';
import { EmptyState, DocumentCard, DocumentList } from '../../components';

const TrashFiles = ({ title = "Trash Files", onViewChange }) => {
  const [viewType, setViewType] = useState('grid');
  const [trashFiles, setTrashFiles] = useState([]);

  const allFiles = useSelector((state) => state.file.files);
  const user = useSelector((state) => state.user.userData);
  const { onViewFile } = useOutletContext();

  useEffect(() => {
    const trashed = allFiles.filter(file => file.deleted);
    setTrashFiles(trashed);
  }, [allFiles]);

  const handleViewChange = (type) => {
    setViewType(type);
    if (onViewChange) onViewChange(type);
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-zinc-700">{title}</h3>
        <div className="flex items-center bg-gray-100 gap-2 font-semibold rounded-md">
          <button
            onClick={() => handleViewChange('grid')}
            className={`p-3 rounded-l-md transition cursor-pointer ${
              viewType === 'grid'
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Grid View"
          >
            <FiGrid size={18} />
          </button>
          <button
            onClick={() => handleViewChange('list')}
            className={`p-3 rounded-r-md transition cursor-pointer ${
              viewType === 'list'
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="List View"
          >
            <FiList size={18} />
          </button>
        </div>
      </div>

      {trashFiles.length === 0 ? (
        <div className="mt-16">
          <EmptyState
            title="No Trashed Files"
            subtitle="Files you delete will appear here. You can restore or delete them permanently."
          />
        </div>
      ) : viewType === 'grid' ? (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trashFiles.map((file) => (
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
          {trashFiles.map((file) => (
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

export default TrashFiles;
