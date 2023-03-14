// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { iMessage, iChat, iMngProfile } from 'types/types.context';
import { chatMock, USER_ID, SERVER_ID, SS } from 'templates';

export const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ mngProfile, setMngProfile ] = useState<iMngProfile>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);

    useEffect(() => {
        if (!mngProfile) {
            const profile = SS.getMngProfile();
            setMngProfile(profile);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (mngProfile) {
            SS.saveMngProfile(mngProfile);
        }
    }, [mngProfile]);

    const updChat = (message: iMessage) => {
        const chatCopy = JSON.parse(JSON.stringify(chat));
        chatCopy.push(message);
        setChat(chatCopy);
        console.log('🔔 updChat..', chat)
    };

    const context = {
        chat,
        updChat,
        mngProfile,
        setMngProfile,
        userId,
        serverId
    };

    return context;
}
