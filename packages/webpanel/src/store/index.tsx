import { useContext, useMemo, useState, createContext } from "react";
import { iChat, iContext, iPropsWithChildren } from 'types/types.context';

const ChatContext = createContext<iContext | []>([]);

function useCardContext () {
    return useContext(ChatContext);
}

function useChat() {
    const [ chat, setChat ] = useState<iChat>([]);

    const chatContext = useMemo(() => ({ chat, setChat }), [ chat ]);

    return chatContext;
}

const Provider: React.FC<iPropsWithChildren> = ({ children }) => {
    const chatContext = useChat();

    return (
        <ChatContext.Provider value={chatContext}>
            {children}
        </ChatContext.Provider>
    );
}
