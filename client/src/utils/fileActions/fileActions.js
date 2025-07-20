import axiosInstance from '../axios/axiosInstance';
import { FilePreviewModal } from '../../components'


export const downloadFile = (file) => {
    if (!file || !file.secure_url) {
        console.error("Invalid file object");
        return;
    }

    const downloadUrl = file.secure_url.replace('/upload/', '/upload/fl_attachment/');

    const link = document.createElement("a");
    link.href = downloadUrl;
    const extension = file.format || file.secure_url.split('.').pop();
    const safeFilename = file.filename
        ? `${file.filename}.${extension}`
        : `downloaded-file.${extension}`;

    link.download = safeFilename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const toggleStarFile = async (fileId, currentStarred) => {
    try {
        const response = await axiosInstance.post(`/files/star/${fileId}`, {
            starred: !currentStarred,
        });
        alert(response.data.message || (currentStarred ? 'Unstarred' : 'Starred'));
        return !currentStarred; // return new starred status
    } catch (error) {
        alert('Failed to update star status');
        console.error(error);
        return currentStarred; // no change on error
    }
};

export const deleteFile = async (fileId) => {
    try {
        if (!window.confirm('Are you sure you want to delete this file?')) return false;

        const response = await axiosInstance.delete(`/files/${fileId}`);
        alert(response.data.message || 'File deleted successfully');
        return true;
    } catch (error) {
        alert('Failed to delete file');
        console.error(error);
        return false;
    }
};
