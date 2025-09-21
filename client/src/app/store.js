import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import fileReducer from './fileSlice'
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
        search: searchReducer
    }
})