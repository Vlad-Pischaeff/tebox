// eslint-disable-next-line
import React, { useEffect } from "react";
import { useChatContext } from 'store';
import { useActions } from './useActions';
import { useBroadcastChannel } from './useBroadcastChannel';
import { iMSG } from 'types/types.context';
import config from '@tebox/config/client';

type eSendMsgType = Extract<
    iMSG,
    iMSG.messageFromClient | iMSG.clientIsOnline | iMSG.registerClient | iMSG.initWebSocket
>;

export const useMessageObject = () => {
    const { userId, serverId, isSWReady } = useChatContext();
    const { BC } = useBroadcastChannel();
    const { actions } = useActions();

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
            actions.run(msg);
            BC?.postMessage(msg);
        },
    };

    return ({
        MSG,
    });
};
