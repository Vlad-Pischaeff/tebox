// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useBroadcastChannel } from 'hooks/useBroadcastChannel';
import { useServiceWorker } from 'hooks/useServiceWorker';
import { iMSG } from 'types/types.context';
import { USER_ID, SERVER_ID } from 'templates';
import { emitter } from 'utils';
import config from '@tebox/config/client';

type eSendMsgType = Exclude<
    iMSG,
    iMSG.managerProfile | iMSG.messageFromManager | iMSG.managerIsOnline
>;

export const useMessageObject = () => {
    const { BC } = useBroadcastChannel();
    const { SW, isSWReady } = useServiceWorker();
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

    return ({
        userId,
        serverId,
        SW,
        isSWReady,
        MSG
    });
}
