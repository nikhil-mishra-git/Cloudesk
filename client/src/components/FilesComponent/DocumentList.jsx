import React from 'react';
import {
    BsFiletypePdf,
    BsFiletypeDoc,
    BsFiletypePptx,
    BsFiletypeTxt,
    BsFileEarmarkZip,
    BsFiletypePng,
    BsFiletypeJpg
} from 'react-icons/bs';
import { FaFileAlt } from 'react-icons/fa';
import { ThreeDotMenu } from '../index'

const FileIconBox = ({ icon, gradient }) => (
    <div
        className={`w-8 md:w-12 h-8 md:h-12 p-2 rounded-md md:rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md`}
    >
        {icon}
    </div>
);

const getFileIconInfo = (type = '') => {
    switch (type.toLowerCase()) {
        case '.pdf':
            return { icon: <BsFiletypePdf size={24} />, gradient: 'from-red-500 to-red-700' };
        case '.doc':
        case '.docx':
            return { icon: <BsFiletypeDoc size={24} />, gradient: 'from-blue-500 to-blue-700' };
        case '.ppt':
        case '.pptx':
            return { icon: <BsFiletypePptx size={24} />, gradient: 'from-orange-500 to-orange-700' };
        case '.jpg':
        case '.jpeg':
            return { icon: <BsFiletypeJpg size={24} />, gradient: 'from-green-500 to-green-700' };
        case '.png':
            return { icon: <BsFiletypePng size={24} />, gradient: 'from-orange-500 to-orange-700' };
        case '.txt':
            return { icon: <BsFiletypeTxt size={24} />, gradient: 'from-gray-500 to-gray-700' };
        case '.zip':
        case '.rnf':
            return { icon: <BsFileEarmarkZip size={24} />, gradient: 'from-green-500 to-emerald-700' };
        default:
            return { icon: <FaFileAlt size={24} />, gradient: 'from-zinc-400 to-zinc-600' };
    }
};


const DocumentList = ({ fileName, owner, date, fileType, file, onViewFile }) => {
    const { icon, gradient } = getFileIconInfo(fileType);

    return (
        <div className="flex items-center space-x-4 bg-white rounded-lg shadow p-1.5 md:p-4 mb-4">

            <FileIconBox icon={icon} gradient={gradient} />

            <div className="flex-1">
                <h3 className="block md:hidden text-xs font-semibold text-gray-800">
                    {fileName.length > 8 ? fileName.slice(0, 8) + '...' : fileName}
                </h3>

                {/* Full name on medium and larger screens */}
                <h3 className="hidden md:block text-base font-semibold text-gray-800">
                    {fileName}
                </h3>
                <div className="flex justify-between items-center text-[9px] md:text-xs text-gray-500 mt-1">
                    <span className="truncate">{date}</span>
                </div>
            </div>

            <div className="hidden md:block text-sm text-gray-500 truncate">{owner}</div>

            <div className='relative'>
                <ThreeDotMenu
                    className=" cursor-pointer rounded-md text-zinc-500 hover:text-gray-600 hover:bg-white p-1 transition-colors"
                    aria-label="More options"
                    file={file}
                    onView={() => onViewFile(file)}
                />
            </div>

        </div>
    );
};

export default DocumentList;
