import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from 'store/api/usersApi';
import { todosApi } from 'store/api/todosApi';
import { notesApi } from 'store/api/notesApi';
import { answersApi } from 'store/api/answersApi';
import { websitesApi } from 'store/api/websitesApi';
import { websocketApi } from 'store/api/websocketApi';
import authReducer from 'store/slices/auth';
import uiReducer from 'store/slices/ui';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [todosApi.reducerPath]: todosApi.reducer,
        [notesApi.reducerPath]: notesApi.reducer,
        [answersApi.reducerPath]: answersApi.reducer,
        [websitesApi.reducerPath]: websitesApi.reducer,
        [websocketApi.reducerPath]: websocketApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersApi.middleware)
            .concat(todosApi.middleware)
            .concat(notesApi.middleware)
            .concat(answersApi.middleware)
            .concat(websitesApi.middleware)
            .concat(websocketApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
