import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';
import { iNotes } from './apiTypes';

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        Notes: builder.query<iNotes[], string>({
            query: () => ({
                url: 'notes'
            }),
            providesTags: ['Notes'],
        }),
        getNote: builder.query({
            query: (id) => ({
                url: `notes/${id}`
            }),
            providesTags: ['Notes'],
        }),
        addNote: builder.mutation({
            query: (note) => ({
                url: 'notes',
                method: 'POST',
                body: note
            }),
            invalidatesTags: ['Notes'],
        }),
        editNote: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `notes/${id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ['Notes']
        }),
        deleteNote: builder.mutation({
            query: ({id}) => ({
                url: `notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notes']
        })
    }),
});

export const {
    useNotesQuery,
    useLazyNotesQuery,
    useGetNoteQuery,
    useLazyGetNoteQuery,
    useAddNoteMutation,
    useEditNoteMutation,
    useDeleteNoteMutation
} = notesApi;
