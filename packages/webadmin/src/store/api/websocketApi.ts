import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@tebox/config/client';
import { iWebSocketMessage, iChat } from './apiTypes';

let socket: WebSocket;

const getSocket = () => {
    return !socket
        ? new WebSocket(config.WEBSOCKET_ADDR)
        : socket;
};

export const websocketApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    // tagTypes: ['Post'],
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
        getMessages: builder.query<iChat, string>({
            queryFn: (args, { signal, dispatch, getState }) => ({ data: {} }),
            // providesTags: ['Post'],
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
                        const [ key ] = Object.keys(msg);

                        if (key === 'MSG_FROM_CLIENT' ||
                            key === 'MSG_FROM_SERVER') {
                            updateCachedData((draft) => {
                                const idx = msg[key].from;

                                if (idx in draft) {
                                    draft[idx].cnt++;
                                } else {
                                    draft[idx] = { 'msgs': [], 'cnt': 1 };
                                }

                                draft[idx].msgs.push(msg[key]);
                            });
                        }

                        console.log('socket onmessage..', msg, key);
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
