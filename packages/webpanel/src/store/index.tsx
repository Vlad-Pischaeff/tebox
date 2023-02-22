import React, { useContext, useMemo, useState, useEffect } from "react";
import { iChat, iPropsWithChildren } from 'types/types.context';
import { chatMock, USER_ID, MANAGER_ID } from 'templates';
import { SocketSend } from 'utils/websocket';

const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    const [ userId, setUserId ] = useState(USER_ID());
    const [ managerId, setManagerId ] = useState(MANAGER_ID);

    useEffect(() => {
        // ✅ send registration information to server
        const message = {
            'register user': {
                'userId': userId,
                'serverKey': MANAGER_ID
            }
        };
        SocketSend(message);
    }, [])

    const context = useMemo(() => ({
        chat,
        setChat,
        userId,
        managerId
    }), [chat]);

    return context;
}

const ChatContext = React.createContext({} as ReturnType<typeof useChat>)

export const useChatContext = () => {
    return useContext(ChatContext);
}

export const Provider: React.FC<iPropsWithChildren> = ({ children }) => {
    const context = useChat();

    return (
        <ChatContext.Provider value={context}>
            {children}
        </ChatContext.Provider>
    );
}
