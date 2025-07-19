export const viewDocument = (fileUrl) => {
    if (fileUrl) {
        window.open(fileUrl, '_blank');
    } else {
        alert('File URL not available');
    }
};
