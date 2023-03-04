// eslint-disable-next-line
import React, { useMemo, useState, useCallback } from "react";
import { iMessage, iChat } from 'types/types.context';
import { chatMock, USER_ID, SERVER_ID } from 'templates';

export const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);

    const updChat = useCallback((message: iMessage) => {
        const chatCopy = JSON.parse(JSON.stringify(chat));
        chatCopy.push(message);
        setChat(chatCopy);
        console.log('🔔 updChat..', chat)
    }, [chat]);

    const context = useMemo(() => ({
        chat,
        updChat,
        userId,
        serverId,
    }), [chat, userId, serverId, updChat]);

    return context;
}
