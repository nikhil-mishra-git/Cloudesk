import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    files: [],
};

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile: (state, action) => {
            state.files.push(action.payload);
        },
        deleteFile: (state, action) => {
            state.files = state.files.filter(file => file.id !== action.payload);
        },
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        clearFiles: (state) => {
            state.files = [];
        },
        updateFile: (state, action) => {
            const updatedFile = action.payload;
            const index = state.files.findIndex(file => file.id === updatedFile.id);
            if (index !== -1) {
                state.files[index] = updatedFile; 
            }
        },
    },
});

export const { addFile, deleteFile, setFiles, clearFiles, updateFile } = fileSlice.actions;
export default fileSlice.reducer;
