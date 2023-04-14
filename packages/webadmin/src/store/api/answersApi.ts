import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';
import { iAnswers, iQuery } from './apiTypes';

export const answersApi = createApi({
    reducerPath: 'answersApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Answers'],
    endpoints: (builder) => ({
        Answers: builder.query<iAnswers[], iQuery>({
            query: (arg) => ({
                url: 'answers',
                params: arg
            }),
            providesTags: ['Answers'],
        }),
        getAnswer: builder.query({
            query: (id) => ({
                url: `answers/${id}`
            }),
            providesTags: ['Answers'],
        }),
        addAnswer: builder.mutation({
            query: (answer) => ({
                url: 'answers',
                method: 'POST',
                body: answer
            }),
            invalidatesTags: ['Answers'],
        }),
        editAnswer: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `answers/${id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ['Answers']
        }),
        deleteAnswer: builder.mutation({
            query: ({id}) => ({
                url: `answers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Answers']
        })
    }),
});

export const {
    useAnswersQuery,
    useLazyAnswersQuery,
    useGetAnswerQuery,
    useLazyGetAnswerQuery,
    useAddAnswerMutation,
    useEditAnswerMutation,
    useDeleteAnswerMutation
} = answersApi;
