import React from 'react';
import { FiMoreVertical, FiChevronRight } from 'react-icons/fi';
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
        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md`}
    >
        {icon}
    </div>
);

const getFileIconInfo = (type = '') => {

    switch (type.toLowerCase()) {
        case '.pdf':
            return { icon: <BsFiletypePdf size={32} />, gradient: 'from-red-500 to-red-700' };
        case '.doc':
        case '.docx':
            return { icon: <BsFiletypeDoc size={32} />, gradient: 'from-blue-500 to-blue-700' };
        case '.ppt':
        case '.pptx':
            return { icon: <BsFiletypePptx size={32} />, gradient: 'from-orange-500 to-orange-700' };
        case '.jpg':
        case '.jpeg':
            return { icon: <BsFiletypeJpg size={32} />, gradient: 'from-green-500 to-green-700' };
        case '.png':
            return { icon: <BsFiletypePng size={32} />, gradient: 'from-orange-500 to-orange-700' };
        case '.txt':
            return { icon: <BsFiletypeTxt size={32} />, gradient: 'from-gray-500 to-gray-700' };
        case '.zip':
        case '.rnf':
            return { icon: <BsFileEarmarkZip size={32} />, gradient: 'from-green-500 to-emerald-700' };
        default:
            return { icon: <FaFileAlt size={30} />, gradient: 'from-zinc-400 to-zinc-600' };
    }
};

const DocumentCard = ({ fileName, owner, date, fileType, file, onViewFile }) => {
    const { icon, gradient } = getFileIconInfo(file.format);

    return (
        <div className="relative bg-white rounded-2xl shadow transition-all duration-300 w-full max-w-sm overflow-hidden group">

            <div className="bg-[#f1f3f5] px-6 py-12 relative">

                <ThreeDotMenu
                    className="absolute top-4 right-4 cursor-pointer rounded-md text-zinc-500 hover:text-gray-600 hover:bg-white p-1 transition-colors"
                    aria-label="More options"
                    file={file}
                    onView={() => onViewFile(file)}
                />

                <div className="flex justify-center items-center">
                    <FileIconBox icon={icon} gradient={gradient} />
                </div>
            </div>

            <div className="px-6 py-4">
                <h3 className="text-base font-semibold text-gray-800 truncate">{fileName}</h3>
                <div className="flex justify-between items-center text-xs text-gray-500 my-3">
                    <span className="truncate">{owner}</span>
                    <span>{date}</span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <span
                        className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded text-gray-600 uppercase tracking-wide"
                        title={`.${fileType} file`}
                    >
                        {fileType}
                    </span>


                    <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer"
                        aria-label="Open details"
                        onClick={() => onViewFile(file)}
                    >
                        <FiChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default DocumentCard;
