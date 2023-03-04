import React from "react";
import { useChat } from './chatCntx';
import { iPropsWithChildren } from 'types/types.context';

const ChatContext = React.createContext({} as ReturnType<typeof useChat>)

export const useChatContext = () => {
    return React.useContext(ChatContext);
}

export const Provider: React.FC<iPropsWithChildren> = ({ children }) => {
    const context = useChat();

    return (
        <ChatContext.Provider value={context}>
            {children}
        </ChatContext.Provider>
    );
}
