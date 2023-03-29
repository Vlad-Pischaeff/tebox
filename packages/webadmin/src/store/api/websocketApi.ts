import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@tebox/config/client';
import { iWebSocketMessage, iChat } from './apiTypes';
import { RootState } from 'store/store';

let socket: WebSocket | undefined;

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
                { getState, cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                try {
                    await cacheDataLoaded;

                    socket = getSocket();

                    socket.onopen = () => {
                        const yourId = (getState() as RootState).auth.id;

                        !!socket &&
                            socket.send(JSON.stringify({
                                'MANAGER_IS_ONLINE': {
                                    'from': yourId,
                                    'to': 'server',
                                    'message': 'ONLINE',
                                    'date': Date.now()
                                }
                            }));
                        console.log('✔️ socket opened..')
                    };

                    socket.onmessage = (message) => {
                        const msg = JSON.parse(message.data) as iWebSocketMessage;
                        const [ key ] = Object.keys(msg);

                        if (key === 'MSG_FROM_CLIENT' ||
                            key === 'MSG_FROM_SERVER') {

                            updateCachedData((draft) => {
                                const idx = msg[key].from;

                                if (idx in draft) {
                                    // обновляем счетчик, если пользователь на выбран
                                    const selectedtUserID = (getState() as RootState).auth.selectedtUserID;
                                    (idx !== selectedtUserID) && draft[idx].cnt++;
                                } else {
                                    draft[idx] = { 'msgs': [], 'cnt': 1 };
                                }

                                draft[idx].msgs.push(msg[key]);
                            });
                        }

                        console.log('💬 socket..', msg);
                    };

                    await cacheEntryRemoved;

                    socket.onclose = () => { console.log('❗ socket closed..') };

                    //
                    // ⚡️ TODO!!!
                    // при 'logout' сведения о сокете на сервере сохраняются
                    // и сервер может туда слать сообщения...
                    //
                    socket = undefined;
                    console.log('❗ socket undefined..')
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
