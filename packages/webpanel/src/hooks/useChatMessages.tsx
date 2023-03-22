// eslint-disable-next-line
import React, { useState } from "react";
import { iMessage, iChat } from 'types/types.context';
// import { chatMock } from 'templates';

export const useChatMessages = () => {
    const [ chat, setChat ] = useState<iChat>([]);
    const [ isMail, setIsMail ] = useState(false);

    const updChat = (message: iMessage) => {
        const chatCopy = JSON.parse(JSON.stringify(chat));
        chatCopy.push(message);
        setChat(chatCopy);
        console.log('🔔 updChat..', chat);
    };

    return ({
        chat,
        updChat,
        isMail,
        setIsMail,
    });
}
