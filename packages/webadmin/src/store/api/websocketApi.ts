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
        sendMessage: builder.mutation<string, string>({
            queryFn: (chatMessageContent: string) => {
                const socket = getSocket();

                return new Promise(resolve => {
                    socket.send(chatMessageContent)
                    resolve({ data: 'OK' });
                })
            },
        }),
        getMessages: builder.query<iMessage[], string>({
            queryFn: (args, { signal, dispatch, getState }) => ({ data: [] }),
            async onCacheEntryAdded(
                userId,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                try {
                    await cacheDataLoaded;

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
                            !!msg['MSG_FROM_CLIENT'] &&
                                draft.push(msg['MSG_FROM_CLIENT']);
                            !!msg['MSG_FROM_SERVER'] &&
                                draft.push(msg['MSG_FROM_SERVER']);
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
    useGetMessagesQuery,
    useSendMessageMutation
} = websocketApi;
