// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { iMessage, iChat, iMngProfile } from 'types/types.context';
import { isServiceWorkerEnabled, isServiceWorkerActivated } from 'utils';
import { chatMock, USER_ID, SERVER_ID, SS } from 'templates';

export const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    const [ SW, setSW ] = useState<ServiceWorker>();
    const [ isSWReady, setSWReady] = useState(false);
    const [ mngProfile, setMngProfile ] = useState<iMngProfile>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);

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
            SW.onstatechange = (e: Event) => {
                if (isServiceWorkerActivated(e)) {
                    // 1 step. Initialize WebSocket
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

    const updChat = (message: iMessage) => {
        const chatCopy = JSON.parse(JSON.stringify(chat));
        chatCopy.push(message);
        setChat(chatCopy);
        console.log('🔔 updChat..', chat)
    };

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

    const context = {
        chat,
        updChat,
        mngProfile,
        setMngProfile,
        userId,
        serverId,
        SW,
        isSWReady
    };

    return context;
}
