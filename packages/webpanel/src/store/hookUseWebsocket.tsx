// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from "react";
import { emitter } from 'utils';
import { iMSG } from 'types/types.context';
import { USER_ID, SERVER_ID } from 'templates';
import { config } from 'config';

export const useWebsocket = () => {
    const [ socket, setSocket ] = useState<WebSocket>();

    useEffect(() => {
        const s = new WebSocket(config.WEBSOCKET_ADDR);
        setSocket(s);
    }, [])

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
        const newMsg = prepareMessage(type, message);

        !!socket && socket.send(JSON.stringify(newMsg));

        if (type === (iMSG.messageFromClient || iMSG.messageFromManager)) {
            emitter.emit('update chat array', newMsg[type]);
        }
    }, [socket, prepareMessage]);

    const getMessage = useCallback((evt: MessageEvent) => {
        const data = JSON.parse(evt.data);

        if (iMSG.messageFromManager in data) {
            emitter.emit('update chat array', data[iMSG.messageFromManager]);
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log('✅ tebox panel connected ... ');
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
        getMessage,
    });
}
