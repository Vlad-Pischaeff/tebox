// eslint-disable-next-line
import React, { useState, useEffect, useMemo } from "react";
import config from '@tebox/config/client';
import { useChatContext } from 'store';
import { iMSG, iWebSocketMessage } from 'types/types.context';

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
            !!socket && socket.send(JSON.stringify(data));
            updChat(data[iMSG.messageFromClient]);
        },
        [iMSG.managerProfile]: (data: iWebSocketMessage) => {
            const obj = data[iMSG.managerProfile];
            setMngProfile(obj.message);
        },
        [iMSG.registerClient]: (data: iWebSocketMessage) => {
            !!socket && socket.send(JSON.stringify(data));
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


    return ({
        socket,
        actions,
    });
}
