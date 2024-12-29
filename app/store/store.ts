import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counterSlice';
import activitySlice from './slices/acitivitySlice';
import authSlice from './slices/authSlice';
import { apiSlice } from './api';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        activities: activitySlice,
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;