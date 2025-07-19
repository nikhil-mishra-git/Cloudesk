import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.userData = action.payload.userData
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.userData = null
            state.isLoggedIn = false
        },
    },
})

export const { authLogin, logout } = userSlice.actions
export default userSlice.reducer
