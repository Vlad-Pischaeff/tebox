// eslint-disable-next-line
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useChatContext } from 'store';
import { iMSG, iWebSocketMessage } from 'types/types.context';
import { USER_ID, SERVER_ID } from 'templates';
import { config } from 'config';

export const useWebSocket = () => {
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
            !!socket && socket.send(JSON.stringify(data));
            updChat(data[iMSG.messageFromClient]);
        },
        [iMSG.managerProfile]: (data: iWebSocketMessage) => {
            const obj = data[iMSG.managerProfile];
            setMngProfile(obj.message);
        },
        [iMSG.registerClient]: (data: iWebSocketMessage) => {
            console.log('🎃 iMSG.managerProfile', data);
        },
        [iMSG.managerIsOnline]: (data: iWebSocketMessage) => {
            console.log('🤢 iMSG.managerIsOnline');
        },
        [iMSG.clientIsOnline]: (data: iWebSocketMessage) => {
            console.log('🥴 iMSG.clientIsOnline');
        },
        'run': (data: iWebSocketMessage) => {
            const [ key ] = Object.keys(data) as iMSG[];
            actions[key](data);
        },
        // eslint-disable-next-line
    }), [updChat, setMngProfile]);

    const prepareMessage = useCallback((type: iMSG, msg = '') => {
        return {
            [type]: {
                'from': USER_ID(),
                'to': SERVER_ID,
                'message': msg,
                'date': Date.now(),
            }
        }
    }, []);

    const sendMessage = useCallback((type: iMSG, message: string ) => {
        const msg = prepareMessage(type, message);
        actions.run(msg);
    }, [prepareMessage, actions]);

    const getMessage = useCallback((evt: MessageEvent) => {
        const msg = JSON.parse(evt.data);
        actions.run(msg);
    }, [actions]);

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log('🔷 tebox panel socket opened.. ');
                sendMessage(iMSG.registerClient, 'NULL');
            }
            // ✅ add websocket listener
            socket.addEventListener('message', getMessage);
        }
        return () => {
            !!socket && socket.removeEventListener('message', getMessage);
        }
    }, [socket, getMessage, sendMessage]);

    return ({
        socket,
        sendMessage,
    });
}
