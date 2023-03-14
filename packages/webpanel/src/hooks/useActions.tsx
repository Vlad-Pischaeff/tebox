// eslint-disable-next-line
import React, { useMemo } from "react";
import { useChatContext } from 'store';
import { iMSG, iWebSocketMessage, isMngProfile } from 'types/types.context';

export const useActions = () => {
    const { updChat, setMngProfile } = useChatContext();

    const actions = useMemo(() => ({
        [iMSG.messageFromManager]: (data: iWebSocketMessage) => {
            updChat(data[iMSG.messageFromManager]);
        },
        [iMSG.messageFromClient]: (data: iWebSocketMessage) => {
            updChat(data[iMSG.messageFromClient]);
        },
        [iMSG.managerProfile]: (data: iWebSocketMessage) => {
            const { message } = data[iMSG.managerProfile];

            if (typeof message !== 'string' && isMngProfile(message)) {
                setMngProfile(message);
            }
        },
        [iMSG.registerClient]: (data: iWebSocketMessage) => {
            console.log('2️⃣ iMSG.registerClient message..', data);
        },
        [iMSG.managerIsOnline]: (data: iWebSocketMessage) => {
            console.log('1️⃣ iMSG.managerIsOnline');
        },
        [iMSG.clientIsOnline]: (data: iWebSocketMessage) => {
            console.log('0️⃣ iMSG.clientIsOnline');
        },
        [iMSG.initWebSocket]: (data: iWebSocketMessage) => {
            console.log('3️⃣ iMSG.initWebSocket');
        },
        'run': (data: iWebSocketMessage) => {
            const [ key ] = Object.keys(data) as iMSG[];
            actions[key](data);
        },
    }), [updChat, setMngProfile]);


    return ({
        actions,
    });
}
