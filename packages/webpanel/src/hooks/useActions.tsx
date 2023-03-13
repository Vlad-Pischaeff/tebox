// eslint-disable-next-line
import React, { useState, useEffect, useMemo } from "react";
import config from '@tebox/config/client';
import { useChatContext } from 'store';
import { iMSG, iWebSocketMessage, isMngProfile } from 'types/types.context';

export const useActions = () => {
    const { updChat, setMngProfile } = useChatContext();
    const [ socket, setSocket ] = useState<WebSocket>();

    useEffect(() => {
        const s = new WebSocket(config.WEBSOCKET_ADDR);
        setSocket(s);
    }, [])

    const actions = useMemo(() => ({
        [iMSG.messageFromManager]: (data: iWebSocketMessage) => {
            updChat(data[iMSG.messageFromManager]);
        },
        [iMSG.messageFromClient]: (data: iWebSocketMessage) => {
            if (socket) {
                // console.log(`🎃 iMSG.messageFromClient socket defined..${!!socket}`)
                socket.send(JSON.stringify(data));
            }
            updChat(data[iMSG.messageFromClient]);
        },
        [iMSG.managerProfile]: (data: iWebSocketMessage) => {
            const { message } = data[iMSG.managerProfile];

            if (typeof message !== 'string' && isMngProfile(message)) {
                setMngProfile(message);
            }
        },
        [iMSG.registerClient]: (data: iWebSocketMessage) => {
            if (socket) {
                // console.log(`🎃 iMSG.registerClient socket defined..${!!socket}`)
                socket.send(JSON.stringify(data));
            }
            // console.log('🎃 iMSG.registerClient message..', data);
        },
        [iMSG.managerIsOnline]: (data: iWebSocketMessage) => {
            console.log('🤢 iMSG.managerIsOnline');
        },
        [iMSG.clientIsOnline]: (data: iWebSocketMessage) => {
            console.log('🥴 iMSG.clientIsOnline');
        },
        [iMSG.initWebSocket]: (data: iWebSocketMessage) => {
            console.log('🥴 iMSG.initWebSocket');
        },
        'run': (data: iWebSocketMessage) => {
            const [ key ] = Object.keys(data) as iMSG[];
            actions[key](data);
        },
    }), [updChat, setMngProfile, socket]);


    return ({
        socket,
        actions,
    });
}
