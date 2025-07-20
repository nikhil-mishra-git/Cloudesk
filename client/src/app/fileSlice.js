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
        }
    },
});

export const { addFile, deleteFile, setFiles, clearFiles } = fileSlice.actions;
export default fileSlice.reducer;