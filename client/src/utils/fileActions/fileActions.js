import api from '../axios/api';
import { setFiles } from '../../app/fileSlice';


// Refresh files and dispatch to Redux
export const refreshFiles = async (dispatch) => {
    try {
        const res = await api.files.getAll();
        dispatch(setFiles(res.data.files));
    } catch (err) {
        console.error('Failed to refresh files:', err.message);
    }
};

// Download file
export const downloadFile = (file) => {
    if (!file || !file.secure_url) return;

    const downloadUrl = file.secure_url.replace('/upload/', '/upload/fl_attachment/');
    const link = document.createElement("a");
    link.href = downloadUrl;

    const extension = file.format || file.secure_url.split('.').pop();
    const safeFilename = file.filename ? `${file.filename}.${extension}` : `downloaded-file.${extension}`;

    link.download = safeFilename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Toggle starred
export const toggleStarFile = async (fileId, currentStarred) => {
    try {
        const response = await api.files.toggleStar(fileId, currentStarred);
        return response.data.file.starred;
    } catch (error) {
        console.error('Toggle star error:', error.response?.data || error.message);
        throw error;
    }
};

// Move to trash
export const deleteFile = async (fileId) => {
    try {
        const response = await api.files.delete(fileId);
        return response.data.message || 'File moved to trash';
    } catch (error) {
        throw error;
    }
};

// Restore from trash
export const restoreFile = async (fileId) => {
    try {
        await api.files.restore(fileId);
        return true;
    } catch (error) {
        throw error;
    }
};

// Permanently delete file
export const finalDelete = async (fileId) => {
    try {
        const response = await api.files.permanentDelete(fileId);
        return response.data.message || 'File permanently deleted';
    } catch (error) {
        throw error;
    }
};
