// eslint-disable-next-line
import React, { useEffect } from "react";
import { useChatContext } from 'store';
import { useBroadcastChannel } from './useBroadcastChannel';
import { emitter } from 'utils';
import { iMSG } from 'types/types.context';
import config from '@tebox/config/client';

type eSendMsgType = Extract<
    iMSG,
    iMSG.messageFromClient |
    iMSG.mailFromClient |
    iMSG.clientIsOnline |
    iMSG.registerClient |
    iMSG.initWebSocket
>;

export const useMessageObject = () => {
    const { userId, serverId, isSWReady, actions } = useChatContext();
    const { BC } = useBroadcastChannel();

    useEffect(() => {
        emitter.on(iMSG.messageFromClient, emitterMessage);
        emitter.on(iMSG.mailFromClient, emitterMessage);
        return () => {
            emitter.off(iMSG.messageFromClient, emitterMessage);
            emitter.off(iMSG.mailFromClient, emitterMessage);
        }
        // eslint-disable-next-line
    }, [actions]);

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

    const emitterMessage = (data: any) => {
        MSG.sendMessage(data?.type, data?.detail);
    }

    return ({
        MSG,
    });
};
