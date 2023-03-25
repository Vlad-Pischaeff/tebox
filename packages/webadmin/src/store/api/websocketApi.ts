import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@tebox/config/client';
import { iMessage, iWebSocketMessage } from './apiTypes';

let socket: WebSocket;

const getSocket = () => {
    return !socket
        ? new WebSocket(config.WEBSOCKET_ADDR)
        : socket;
};

export const websocketApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getMessages: builder.query<iMessage[], string>({
            queryFn: (args, { signal, dispatch, getState }) => ({ data: [] }),
            async onCacheEntryAdded(
                userId,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                try {
                    await cacheDataLoaded;

                    console.log('api...', userId);

                    socket = getSocket();

                    socket.onopen = () => {
                        socket.send(JSON.stringify({
                            'MANAGER_IS_ONLINE': {
                                'from': userId,
                                'to': 'server',
                                'message': 'ONLINE',
                                'date': Date.now()
                            }
                        }));
                    };

                    socket.onmessage = (message) => {
                        const msg = JSON.parse(message.data) as iWebSocketMessage;

                        updateCachedData((draft) => {
                            draft.push(msg['MSG_FROM_MANAGER']);
                        });

                        console.log('socket onmessage..', msg);
                    };

                    await cacheEntryRemoved;
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),
    }),
})

export const {
    useGetMessagesQuery
} = websocketApi;
