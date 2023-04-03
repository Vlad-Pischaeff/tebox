import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import config from '@tebox/config/client';
import { setCredentials, logout } from 'store/slices/auth';
import { RootState } from 'store/store';

type tData = {
    accessToken: string,
    refreshToken: string,
    id: string,
};

type tResult = {
    data: tData,
}

const baseQuery = fetchBaseQuery({
    baseUrl: `${config.URL}/api/`,
    credentials: 'include',     // ⚡ will send back "httpOnly cookie" for every request
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.jwtToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReAuth:
    BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError | { data: { message: string } } | undefined
    > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // console.log('result => ', result);

    if (result?.error?.status === 403 ||
        result?.error?.status === 401 ) {
        // console.log('sending refresh token =>');
        // ⚡ send refresh token to get new access token
        const refreshResult = await baseQuery('/users/refresh', api, extraOptions) as tResult;
        // console.log('refreshResult =>', refreshResult);

        if (refreshResult?.data) {
            const id = (api.getState() as RootState).auth.id;
            // ⚡ store new token
            api.dispatch(setCredentials({ ...refreshResult.data, id }));
            // ⚡ retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};
