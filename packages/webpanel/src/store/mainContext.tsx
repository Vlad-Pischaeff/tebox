// eslint-disable-next-line
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useBroadcastChannel } from 'hooks/useBroadcastChannel';
import { useServiceWorker } from 'hooks/useServiceWorker';
import { useManagerProfile } from 'hooks/useManagerProfile';
import { useChatMessages } from 'hooks/useChatMessages';
import { iMngProfile } from 'types/types.context';
import { iMSG, iWebSocketMessage, isMngProfile } from 'types/types.context';
import { USER_ID, SERVER_ID } from 'templates';
import { emitter } from 'utils';
import config from '@tebox/config/client';

type eSendMsgType = Exclude<
    iMSG,
    iMSG.managerProfile | iMSG.messageFromManager | iMSG.managerIsOnline
>;

export const useChat = () => {
    const { BC } = useBroadcastChannel();
    const { SW, isSWReady } = useServiceWorker();
    const { mngProfile, setMngProfile } = useManagerProfile();
    const { chat, updChat, isMail, setIsMail } = useChatMessages();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);

    useEffect(() => {
        if (isSWReady) {
            // 1 step. Initialize WebSocket when Service Worker activated
            MSG.sendMessage(iMSG.initWebSocket, config.WEBSOCKET_ADDR );
        }
        // eslint-disable-next-line
    }, [isSWReady]);

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
            console.log('6️⃣ iMSG.managerProfile..', message);
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

    const runAction = useCallback((data: object) => {
        if ('detail' in data) {
            actions.run(data?.detail as iWebSocketMessage);
        }
    }, [actions]);

    useEffect(() => {
        emitter.on('RUN_ACTION', runAction);
        return () => {
            emitter.off('RUN_ACTION', runAction);
        }
    }, [runAction]);

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
            emitter.emit('RUN_ACTION', msg)
            // actions.run(msg);
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
        MSG
    };

    return context;
}
