import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';
import { iTodos, iQuery } from './apiTypes';

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        Todos: builder.query<iTodos[], iQuery>({
            query: (arg) => ({
                url: 'todos',
                params: arg
            }),
            providesTags: ['Todos'],
        }),
        getTodo: builder.query({
            query: (id) => ({
                url: `todos/${id}`
            }),
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: 'todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos'],
        }),
        editTodo: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `todos/${id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({id}) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        })
    }),
});

export const {
    useTodosQuery,
    useLazyTodosQuery,
    useGetTodoQuery,
    useLazyGetTodoQuery,
    useAddTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation
} = todosApi;
