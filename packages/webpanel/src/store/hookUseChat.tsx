// eslint-disable-next-line
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { iChat, iMessage, iWebSocketMessage } from 'types/types.context';
import { iWS} from 'types/types.websocket';
import { chatMock, USER_ID, SERVER_ID } from 'templates';
import { config } from 'config';

const socket = new WebSocket(config.WEBSOCKET_ADDR);

socket.onopen = () => {
    console.log('✅ tebox panel connected ... ');
}

const WS = {
    prepareMessage(type: string, msg = '') {
        return {
            [type]: {
                'from': USER_ID(),
                'to': SERVER_ID,
                'message': msg,
                'date': Date.now(),
            }
        }
    },
    sendMessage(message: iWebSocketMessage) {
        if (socket) {
            socket.send(JSON.stringify(message));
        }
    },
};

export const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);

    const updateChat = useCallback((data: iMessage) => {
        const chatCopy = JSON.parse(JSON.stringify(chat));
        chatCopy.push(data);
        setChat(chatCopy);
    }, [chat]);

    useEffect(() => {
        const getChatMessage = (evt: MessageEvent) => {
            const data = JSON.parse(evt.data);

            if (iWS.messageFromManager in data) {
                updateChat(data[iWS.messageFromManager]);
            }
        };
        // ✅ add websocket listener
        socket.addEventListener('message', getChatMessage);

        return () => {
            socket.removeEventListener('message', getChatMessage);
        }
    }, [updateChat])

    useEffect(() => {
        // ✅ send registration information to server
        const message = WS.prepareMessage(iWS.registerClient);
        WS.sendMessage(message);
    }, [])

    const context = useMemo(() => ({
        chat,
        setChat,
        updateChat,
        userId,
        serverId,
        WS
    }), [chat, userId, serverId, updateChat]);

    return context;
}
