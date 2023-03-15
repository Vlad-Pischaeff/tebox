// eslint-disable-next-line
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { iMessage, iChat, iMngProfile } from 'types/types.context';
import { iMSG, iWebSocketMessage, isMngProfile } from 'types/types.context';
import { isServiceWorkerEnabled, isServiceWorkerActivated } from 'utils';
import { chatMock, USER_ID, SERVER_ID, SS } from 'templates';
import config from '@tebox/config/client';

type eSendMsgType = Extract<
    iMSG,
    iMSG.messageFromClient |
    iMSG.mailFromClient |
    iMSG.clientIsOnline |
    iMSG.registerClient |
    iMSG.initWebSocket
>;

export const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    const [ SW, setSW ] = useState<ServiceWorker>();    // Service Worker object
    const [ isSWReady, setSWReady] = useState(false);   // "true" when Service Worker activated
    const [ isMail, setIsMail ] = useState(false);      // true or false
    const [ mngProfile, setMngProfile ] = useState<iMngProfile>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);
    const [ BC, setBC ] = useState<BroadcastChannel>();

    useEffect(() => {
        const bc = new BroadcastChannel('swListener');
        setBC(bc);
    }, []);

    useEffect(() => {
        initServiceWorker();

        if (!mngProfile) {
            const profile = SS.getMngProfile();
            setMngProfile(profile);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (SW) {
            if (SW?.state === 'activated') {
                // 1 step. Initialize WebSocket after ServiceWorker has been already activated
                setSWReady(true);
            }
            SW.onstatechange = (e: Event) => {
                if (isServiceWorkerActivated(e)) {
                    // 1 step. Initialize WebSocket for the first time loading
                    setSWReady(true);
                    console.log('✈️ Service Worker state..', SW?.state);
                }
            };
        }
        console.log('☘️ Service Worker state..', SW?.state);
    }, [SW]);

    useEffect(() => {
        if (mngProfile) {
            SS.saveMngProfile(mngProfile);
        }
    }, [mngProfile]);

    useEffect(() => {
        if (isSWReady) {
            // 1 step. Initialize WebSocket when Service Worker activated
            MSG.sendMessage(iMSG.initWebSocket, config.WEBSOCKET_ADDR );
        }
        // eslint-disable-next-line
    }, [isSWReady]);

    const updChat = useCallback((message: iMessage) => {
        const chatCopy = JSON.parse(JSON.stringify(chat));
        chatCopy.push(message);
        setChat(chatCopy);
        console.log('🔔 updChat..', chat)
    }, [setChat, chat]);

    const initServiceWorker = () => {
        if (isServiceWorkerEnabled()) {
            navigator.serviceWorker.register('sw1965.js', {scope: './'})
                .then((registration) => {
                    console.log('🚦 Service Worker registration..');

                    if (registration.installing) {
                        setSW(registration.installing);
                    } else if (registration.waiting) {
                        setSW(registration.waiting);
                    } else if (registration.active) {
                        setSW(registration.active);
                    }
                })
                .catch((error) => {
                    console.log('💥 failed: ', error);
                });
        }
    };

    const actions = useMemo(() => ({
        [iMSG.messageFromManager]: (data: iWebSocketMessage) => {
            updChat(data[iMSG.messageFromManager]);
        },
        [iMSG.messageFromClient]: (data: iWebSocketMessage) => {
            console.log('5️⃣ iMSG.messageFromClient..', data);
            updChat(data[iMSG.messageFromClient]);
        },
        [iMSG.managerProfile]: (data: iWebSocketMessage) => {
            const { message } = data[iMSG.managerProfile];

            if (typeof message !== 'string' && isMngProfile(message)) {
                setMngProfile(message as iMngProfile);
            }
        },
        [iMSG.mailFromClient]: (data: iWebSocketMessage) => {
            console.log('4️⃣ iMSG.mailFromClient..', data);
        },
        [iMSG.registerClient]: (data: iWebSocketMessage) => {
            console.log('2️⃣ iMSG.registerClient..', data);
        },
        [iMSG.managerIsOnline]: (data: iWebSocketMessage) => {
            console.log('1️⃣ iMSG.managerIsOnline..');
        },
        [iMSG.clientIsOnline]: (data: iWebSocketMessage) => {
            console.log('0️⃣ iMSG.clientIsOnline..');
        },
        [iMSG.initWebSocket]: (data: iWebSocketMessage) => {
            console.log('3️⃣ iMSG.initWebSocket');
        },
        'run': (data: iWebSocketMessage) => {
            const [ key ] = Object.keys(data) as iMSG[];
            actions[key](data);
        },
    }), [updChat, setMngProfile]);

    useEffect(() => {
        if (BC) {
            BC.onmessage = (e: MessageEvent) => {
                actions.run(e.data);
                console.log('✈️ BroadcastChannel onmessage..', e.data);
            };
        }
    }, [BC, actions]);

    const MSG = {
        prepareMessage(type: iMSG, message = '') {
            return {
                [type]: {
                    'from': userId,
                    'to': serverId,
                    'message': message,
                    'date': Date.now(),
                }
            }
        },
        sendMessage(type: eSendMsgType, message: string ) {
            const msg = MSG.prepareMessage(type, message);
            actions.run(msg);
            BC?.postMessage(msg);
        },
    };

    const context = {
        chat,
        updChat,
        mngProfile,
        setMngProfile,
        userId,
        serverId,
        SW,
        isSWReady,
        isMail,
        setIsMail,
        actions,
        MSG
    };

    return context;
}
