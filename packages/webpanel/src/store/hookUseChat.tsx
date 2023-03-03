// eslint-disable-next-line
import React, { useMemo, useState, useEffect } from "react";
import { emitter } from 'utils';
import { useWebsocket } from './hookUseWebsocket';
import { iChat } from 'types/types.context';
import { chatMock, USER_ID, SERVER_ID } from 'templates';

export const useChat = () => {
    const { sendMessage } = useWebsocket();
    const [ chat, setChat ] = useState<iChat>(chatMock);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);

    // eslint-disable-next-line
    const updateChat = (data: CustomEvent) => {
        const message = data.detail;
        const chatCopy = JSON.parse(JSON.stringify(chat));
        chatCopy.push(message);
        setChat(chatCopy);
        console.log('🔰 updateChat 2...', chat)
    };

    useEffect(() => {
        emitter.on('update chat array', updateChat);
        return () => {
            emitter.off('update chat array', updateChat);
        }
    }, [updateChat]);

    const context = useMemo(() => ({
        chat,
        sendMessage,
        userId,
        serverId,
    }), [chat, userId, serverId, sendMessage]);

    return context;
}
