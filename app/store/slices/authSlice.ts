import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface AuthState {
    isAuthenticated: boolean,
    user: {
        email?: string | null,
        image?: string | null,
        name?: string | null,
        id?: string | null
    } | null,
    page: string | null,
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    page: "Dashboard",
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
        },
        clearAuth: (state) => {
            state.isAuthenticated = false
            state.user = null
        },

        setPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload
        }

    }
})

export const { setAuth, clearAuth, setPage } = authSlice.actions;
export default authSlice.reducer;