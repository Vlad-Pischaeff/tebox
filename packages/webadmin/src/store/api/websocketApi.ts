import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@tebox/config/client';
import { iWebSocketMessage, iChat, iMails } from './apiTypes';
import { mailsApi } from 'store/api/mailsApi';
import { RootState } from 'store/store';

let socket: WebSocket | undefined;

const getSocket = () => {
    return !socket
        ? new WebSocket(config.WEBSOCKET_URL)
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
                { getState, dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                try {
                    await cacheDataLoaded;

                    const state = (getState() as RootState).auth;
                    const { id: yourId, selectedtUserID } = state;

                    socket = getSocket();

                    socket.onopen = () => {
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
                        const msg = JSON.parse(message.data) satisfies iWebSocketMessage;
                        console.log('💬 socket..', msg);
                        const [ key ] = Object.keys(msg);

                        if (key === 'MSG_FROM_CLIENT' ||
                            key === 'MSG_FROM_SERVER') {

                            updateCachedData((draft) => {
                                const idx = msg[key].from;

                                if (idx in draft) {
                                    // обновляем счетчик, если пользователь на выбран
                                    (idx !== selectedtUserID) && draft[idx].cnt++;
                                } else {
                                    draft[idx] = { 'msgs': [], 'cnt': 1 };
                                }

                                draft[idx].msgs.push(msg[key]);
                            });
                        }

                        if (key === 'MSG_FROM_MANAGER') {

                            updateCachedData((draft) => {
                                const idx = msg[key].to;

                                if (idx in draft) {
                                    // обновляем счетчик, если пользователь на выбран
                                    (idx !== selectedtUserID) && draft[idx].cnt++;
                                } else {
                                    draft[idx] = { 'msgs': [], 'cnt': 1 };
                                }

                                draft[idx].msgs.push(msg[key]);
                            });
                        }

                        // ..update cache of mails, after recieving new mail from client
                        if (key === 'MAIL_FROM_CLIENT') {
                            dispatch(mailsApi.util.updateQueryData(
                                'Mails',    // query endpoint
                                { 'userId': yourId },
                                (draftMails) => {
                                    const mail = msg[key].message as iMails;
                                    draftMails.push(mail);
                                }
                            ));
                        }
                    };

                    socket.onclose = () => { console.log('❌ socket closed..') };

                    await cacheEntryRemoved;

                    // ✅ after 'logout' send message to server
                    // and make websocket undefined
                    socket.send(JSON.stringify({
                        'MANAGER_IS_OFFLINE': {
                            'from': yourId,
                            'to': 'server',
                            'message': 'OFFLINE',
                            'date': Date.now()
                        }
                    }));
                    socket = undefined;

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
