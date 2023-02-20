import React, { useContext, useMemo, useState, useEffect } from "react";
import { iChat, iPropsWithChildren } from 'types/types.context';
import { chatMock, USER_ID, MANAGER_ID } from 'templates';

const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    const [ userId, setUserId ] = useState(USER_ID);
    const [ managerId, setManagerId ] = useState(MANAGER_ID);

    const chatContext = useMemo(() => ({
        chat,
        setChat,
        userId,
        managerId
    }), [ chat ]);

    return chatContext;
}

const ChatContext = React.createContext({} as ReturnType<typeof useChat>)

export const useChatContext = () => {
    return useContext(ChatContext);
}

export const Provider: React.FC<iPropsWithChildren> = ({ children }) => {
    const chatContext = useChat();

    return (
        <ChatContext.Provider value={chatContext}>
            {children}
        </ChatContext.Provider>
    );
}
