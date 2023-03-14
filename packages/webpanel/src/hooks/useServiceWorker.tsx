// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { useChatContext } from 'store';
import { useActions } from './useActions';
import { useBroadcastChannel } from './useBroadcastChannel';
import { iMSG } from 'types/types.context';
import config from '@tebox/config/client';

type eSendMsgType = Extract<
    iMSG,
    iMSG.messageFromClient | iMSG.clientIsOnline | iMSG.registerClient | iMSG.initWebSocket
>;

export const useServiceWorker = () => {
    const { userId, serverId } = useChatContext();
    const { BC } = useBroadcastChannel();
    const { actions } = useActions();
    const [ SW, setSW ] = useState<ServiceWorker>();

    useEffect(() => {
        !!BC && initServiceWorker();
        // eslint-disable-next-line
    }, [BC]);

    useEffect(() => {
        if (SW) {
            // console.log('☘️ SW.state', SW.state);
            SW.onstatechange = (e: Event) => {
                if (e.target &&
                    'state' in e.target &&
                    e.target.state === 'activated') {
                        console.log('🌞 e.target.state', e.target.state);
                        // 1 step. Initialize WebSocket
                        SOCK.sendMessage(iMSG.initWebSocket, config.WEBSOCKET_ADDR );
                        console.log('✈️ BroadcastChannel send..', config.WEBSOCKET_ADDR, userId, serverId);
                }
            };
        }
        // eslint-disable-next-line
    }, [SW]);

    const SOCK = {
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
            const msg = SOCK.prepareMessage(type, message);
            actions.run(msg);
            BC?.postMessage(msg);
        },
    };

    const initServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw1965.js', {scope: './'})
                .then((registration) => {
                    console.log('🚦 registration..');

                    if (registration.installing) {
                        setSW(registration.installing);
                        console.log('🔨 installing');
                    } else if (registration.waiting) {
                        setSW(registration.waiting);
                        console.log('⏳ waiting');
                    } else if (registration.active) {
                        setSW(registration.active);
                        SOCK.sendMessage(iMSG.initWebSocket, config.WEBSOCKET_ADDR );
                        console.log('💚 active');
                    }
                })
                .catch((error) => {
                    console.log('💥 failed: ', error);
                });
        } else {
            console.log('💥 The current browser doesn\'t support service workers');
        }
    };

    return ({
        SOCK
    })
}
