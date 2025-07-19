import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiGrid, FiList } from 'react-icons/fi';
import { UploadButton, EmptyState, DocumentCard, DocumentList } from '../../components'

const MyFiles = ({ title = "Documents", onViewChange }) => {

  const [viewType, setViewType] = useState('grid');
  const user = useSelector((state) => state.user.userData);

  const handleViewChange = (type) => {
    setViewType(type);
    if (onViewChange) onViewChange(type);
  };

  return (
    <div className="p-4 md:p-10">

      <div className="w-full bg-white rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl tracking-wide font-semibold text-zinc-600">Hello, <br /><span className="text-zinc-700 text-4xl">{user.name}</span> 👋</h2>
        </div>

        <UploadButton className='bg-gradient-to-r from-blue-700 to-blue-500 text-white' />

      </div>

      <div className="flex items-center justify-between mt-12">
        <h3 className="text-2xl font-semibold text-zinc-700">{title}</h3>

        <div className="flex items-center bg-gray-100 gap-2 font-semibold rounded-md">
          <button
            onClick={() => handleViewChange('grid')}
            className={`p-3 rounded-l-md transition cursor-pointer ${viewType === 'grid'
              ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
            title="Grid View"
          >
            <FiGrid size={18} />
          </button>

          <button
            onClick={() => handleViewChange('list')}
            className={`p-3 rounded-r-md transition cursor-pointer ${viewType === 'list'
              ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
            title="List View"
          >
            <FiList size={18} />
          </button>
        </div>
      </div>


      {viewType === 'grid' ? (

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          <DocumentCard
            fileName="Resume_Nikhil.pdf"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="pdf"
          />

          <DocumentCard
            fileName="Resume_Nikhil.docx"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="docx"
          />
          <DocumentCard
            fileName="Resume_Nikhil.zip"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="zip"
          />

          <DocumentCard
            fileName="Resume_Nikhil.jpg"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="jpg"
          />

          <DocumentCard
            fileName="Resume_Nikhil.jpg"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="jpg"
          />
          
          <DocumentCard
            fileName="Resume_Nikhil.jpg"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="jpg"
          />

        </div>

      ) : (

        <div className="mt-10 space-y-6">

          <DocumentList
            fileName="Resume_Nikhil.pdf"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="pdf"
          />
          <DocumentList
            fileName="Resume_Nikhil.docx"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="docx"
          />
          <DocumentList
            fileName="Resume_Nikhil.zip"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="zip"
          />
          <DocumentList
            fileName="Resume_Nikhil.jpg"
            owner="Nikhil Mishra"
            date="July 12, 2025"
            fileType="jpg"
          />

        </div>

      )}

    </div>
  );
};

export default MyFiles;
