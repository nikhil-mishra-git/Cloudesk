import React from 'react';
import { FiCloudOff } from 'react-icons/fi';
import { UploadButton} from '../../components'

const EmptyState = ({
    title = "No files here yet",
    message = "Start by uploading your first file and it’ll show up here.",
    actionLabel = "Upload File",
    onActionClick,
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border border-gray-200 rounded-2xl shadow-sm">
         
            <div className="bg-blue-100 text-blue-600 p-6 rounded-full mb-4">
                <FiCloudOff size={40} />
            </div>

            <h2 className="text-2xl font-semibold text-zinc-700">{title}</h2>

            <p className="text-sm text-gray-500 mt-2">{message}</p>

            <UploadButton className='mt-8' />

        </div>
    );
};

export default EmptyState;
