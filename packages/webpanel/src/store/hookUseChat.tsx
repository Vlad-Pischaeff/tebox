// eslint-disable-next-line
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useWebsocket } from './hookUseWebsocket';
import { iChat, iMessage } from 'types/types.context';
import { iWS} from 'types/types.websocket';
import { chatMock, USER_ID, SERVER_ID } from 'templates';

export const useChat = () => {
    const socket = useWebsocket();
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

    const WS = useMemo(() => ({
        prepareMessage(type: iWS, msg = '') {
            return {
                [type]: {
                    'from': USER_ID(),
                    'to': SERVER_ID,
                    'message': msg,
                    'date': Date.now(),
                }
            }
        },
        sendMessage(message: string, type: iWS) {
            const newMsg = this.prepareMessage(type, message);

            !!socket && socket.send(JSON.stringify(newMsg));

            if (type === (iWS.messageFromClient || iWS.messageFromManager)) {
                updateChat(newMsg[type]);
            }
        },
        getMessage(evt: MessageEvent) {
            const data = JSON.parse(evt.data);

            if (iWS.messageFromManager in data) {
                updateChat(data[iWS.messageFromManager]);
            }
        },
        // eslint-disable-next-line
    }), [updateChat]);

    useEffect(() => {
        // ✅ add websocket listener
        !!socket && socket.addEventListener('message', WS.getMessage);
        return () => {
            !!socket && socket.removeEventListener('message', WS.getMessage);
        }
    }, [socket, WS]);

    useEffect(() => {
        // ✅ send registration information to server
        WS.sendMessage('ONLINE', iWS.registerClient);
        // eslint-disable-next-line
    }, [])

    const context = useMemo(() => ({
        chat,
        setChat,
        updateChat,
        userId,
        serverId,
        WS
    }), [chat, userId, serverId, updateChat, WS]);

    return context;
}
