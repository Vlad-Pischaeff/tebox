import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@tebox/config/client';
// import { isMessage } from './schemaValidators'

let socket: WebSocket;

const getSocket = () => {
    return !socket
        ? new WebSocket(config.WEBSOCKET_ADDR)
        : socket;
};

export type Channel = 'redux' | 'general'

export interface Message {
    to: string
    from: string
    message: string
    date: number
}

export const websocketApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], string>({
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
                        console.log('socket onmessage..', JSON.parse(message.data));
                    };

                    // socket.on(ChatEvent.ReceiveMessage, (message: ChatMessage) => {
                    //     updateCachedData((draft) => {
                    //         draft.push(message);
                    //     });
                    // });

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
