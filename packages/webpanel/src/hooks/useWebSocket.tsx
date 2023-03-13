// eslint-disable-next-line
import React, { useEffect, useMemo } from "react";
import { useChatContext } from 'store';
import { iMSG } from 'types/types.context';
import { useActions } from "./useActions";

type eSendMsgType = Extract<
    iMSG,
    iMSG.messageFromClient | iMSG.clientIsOnline | iMSG.registerClient
>;

export const useWebSocket = () => {
    const { socket, actions } = useActions();
    const { userId, serverId } = useChatContext();

    const SOCK = useMemo(() => ({
        prepareMessage(type: iMSG, msg = '') {
            return {
                [type]: {
                    'from': userId,
                    'to': serverId,
                    'message': msg,
                    'date': Date.now(),
                }
            }
        },
        sendMessage(type: eSendMsgType, message: string ) {
            const msg = SOCK.prepareMessage(type, message);
            actions.run(msg);
        },
        getMessage(evt: MessageEvent) {
            const msg = JSON.parse(evt.data);
            actions.run(msg);
        },
        // eslint-disable-next-line
    }), [actions]);

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                // console.log('🔷 tebox panel socket opened.. ', socket);
                SOCK.sendMessage(iMSG.registerClient, '7ra/HQmh1y9wZ3WPUsAZiOKoynPQ7xDZ2v8NFEav9zpJPW.3ziQL6');
            }
            socket.onmessage = (e: MessageEvent) => {
                // console.log('🔷 tebox panel socket get message.. ', e.data);
                SOCK.getMessage(e);
            };
        }
    }, [socket, SOCK]);

    return ({
        socket,
        SOCK,
    });
}
