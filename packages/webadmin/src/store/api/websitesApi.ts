import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';
import { iWebsites } from './apiTypes';

export const websitesApi = createApi({
    reducerPath: 'websitesApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Websites'],
    endpoints: (builder) => ({
        Websites: builder.query<iWebsites[], void>({
            query: () => ({
                url: 'websites'
            }),
            providesTags: ['Websites'],
        }),
        WebsitesHash: builder.query<string[], void>({
            query: () => ({
                url: 'websites'
            }),
            providesTags: ['Websites'],
            transformResponse: (response: iWebsites[]) => response.map((site) => site.hash),
        }),
        getWebsite: builder.query({
            query: (id) => ({
                url: `websites/${id}`
            }),
            providesTags: ['Websites'],
        }),
        addWebsite: builder.mutation({
            query: (website) => ({
                url: 'websites',
                method: 'POST',
                body: website
            }),
            invalidatesTags: ['Websites'],
        }),
        editWebsite: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `websites/${id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ['Websites']
        }),
        deleteWebsite: builder.mutation({
            query: ({id}) => ({
                url: `websites/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Websites']
        })
    }),
});

export const {
    useWebsitesQuery,
    useLazyWebsitesQuery,
    useWebsitesHashQuery,
    useGetWebsiteQuery,
    useLazyGetWebsiteQuery,
    useAddWebsiteMutation,
    useEditWebsiteMutation,
    useDeleteWebsiteMutation
} = websitesApi;
