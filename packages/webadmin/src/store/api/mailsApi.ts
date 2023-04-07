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
    useDeleteMailMutation
} = mailsApi;
