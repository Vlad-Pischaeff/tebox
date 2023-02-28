import React, { useContext, useMemo, useCallback, useState, useEffect } from "react";
import { iChat, iPropsWithChildren } from 'types/types.context';
import { iWS} from 'types/types.websocket';
import { chatMock, USER_ID, SERVER_ID } from 'templates';
import { WS, socket } from 'utils/websocket';

const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerId ] = useState(SERVER_ID);

    const getChatMessage = useCallback((evt: MessageEvent) => {
        const data = JSON.parse(evt.data);
        if (iWS.messageFromManager in data) {
            const chatCopy = JSON.parse(JSON.stringify(chat));
            chatCopy.push(data.messageFromManager);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // ✅ add websocket listener
        socket.addEventListener('message', getChatMessage);
        return () => {
            socket.removeEventListener('message', getChatMessage);
        }
    }, [getChatMessage])

    useEffect(() => {
        // ✅ send registration information to server
        const message = WS.prepareMessage(iWS.clientIsOnline);
        WS.sendMessage(message);
    }, [])

    const context = useMemo(() => ({
        chat,
        setChat,
        userId,
        serverId,
        WS
    }), [chat, userId, serverId]);

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
