// eslint-disable-next-line
import React, { useState, useEffect, useMemo } from "react";
import { useChatContext } from 'store';
import { iMSG } from 'types/types.context';
import config from '@tebox/config/client';

let SW: ServiceWorker;
type eSendMsgType = Extract<
    iMSG,
    iMSG.messageFromClient | iMSG.clientIsOnline | iMSG.registerClient | iMSG.initWebSocket
>;

export const useServiceWorker = () => {
    const { userId, serverId } = useChatContext();
    const [ BC, setBC ] = useState<BroadcastChannel>();

    useEffect(() => {
        const bc = new BroadcastChannel('swListener');
        setBC(bc);
    }, []);

    useEffect(() => {
        if (BC) {
            initServiceWorker();

            BC.onmessage = (e: MessageEvent) => {
                console.log('✈️ BroadcastChannel received..', e.data);
            };
        }
        // eslint-disable-next-line
    }, [BC]);

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
            BC?.postMessage(msg);
        },
        getMessage(e: MessageEvent) {
            const msg = JSON.parse(e.data);
            // actions.run(msg);
        },
        // eslint-disable-next-line
    };

    const initServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw1965.js', {scope: './'})
                .then((registration) => {
                    console.log('🚦 registration..');

                    if (registration.installing) {
                        SW = registration.installing;
                        // console.log('🔨 installing');
                    } else if (registration.waiting) {
                        SW = registration.waiting;
                        // console.log('⏳ waiting');
                    } else if (registration.active) {
                        SW = registration.active;
                        // console.log('💚 active');
                    }

                    if (SW) {
                        // console.log('☘️ SW.state', SW.state);
                        SW.addEventListener('statechange', (e) => {
                            if (e.target && 'state' in e.target) {
                                console.log('🌞 e.target.state', e.target.state);
                                if (e.target.state === 'activated') {
                                    SOCK.sendMessage(iMSG.initWebSocket, config.WEBSOCKET_ADDR );
                                    console.log('✈️ BroadcastChannel send..', config.WEBSOCKET_ADDR, userId, serverId);
                                }
                            }
                        });
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
        BC
    })
}
