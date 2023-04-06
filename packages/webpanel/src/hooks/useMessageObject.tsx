// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useBroadcastChannel } from 'hooks/useBroadcastChannel';
import { useServiceWorker } from 'hooks/useServiceWorker';
import { iPrepMsg, iMSG } from 'types/types.context';
import { USER_ID } from 'templates';
import { emitter } from 'utils';
import config from '@tebox/config/client';

export const useMessageObject = () => {
    const { BC } = useBroadcastChannel();
    const { isSWReady } = useServiceWorker();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID);
    const [ serverId, setServerId ] = useState('undefined');

    const MSG = {
        prepareMessage({ type, message = '', from }: iPrepMsg) {
            return {
                [type]: {
                    'from': from || userId,
                    'to': serverId,
                    'message': message,
                    'date': Date.now(),
                }
            }
        },
        sendMessage({ type, message, from }: iPrepMsg) {
            const msg = MSG.prepareMessage({ type, message, from });
            emitter.emit('RUN_ACTION', msg);
            BC?.postMessage(msg);
        },
    };

    useEffect(() => {
        if (isSWReady) {
            // 1 step. Initialize WebSocket when Service Worker activated
            const type = iMSG.initWebSocket;
            const message = config.WEBSOCKET_URL;
            MSG.sendMessage({ type, message });
        }
        // eslint-disable-next-line
    }, [isSWReady]);

    return ({
        userId,
        serverId,
        setServerId,
        isSWReady,
        MSG
    });
}
