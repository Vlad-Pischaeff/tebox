import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';
import { iMails } from './apiTypes';

export const mailsApi = createApi({
    reducerPath: 'mailsApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Mails'],
    endpoints: (builder) => ({
        Mails: builder.query<iMails[], string>({
            query: (recipient) => ({
                url: 'mails',
                method: 'POST',
                body: { recipient }
            }),
            providesTags: ['Mails'],
        }),
        getMail: builder.query({
            query: (id) => ({
                url: `mails/${id}`
            }),
            providesTags: ['Mails'],
        }),
        addMail: builder.mutation({
            query: (mail) => ({
                url: 'mails',
                method: 'PUT',
                body: mail
            }),
            invalidatesTags: ['Mails'],
        }),
        editMail: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `mails/${id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ['Mails']
        }),
        deleteMail: builder.mutation({
            query: (id) => ({
                url: `mails/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Mails']
        })
    }),
});

export const {
    useMailsQuery,
    useLazyMailsQuery,
    useGetMailQuery,
    useLazyGetMailQuery,
    useAddMailMutation,
    useEditMailMutation,
    useDeleteMailMutation
} = mailsApi;
