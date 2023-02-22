import React, { useContext, useMemo, useState, useEffect } from "react";
import { iChat, iPropsWithChildren, iWebSocketMessage } from 'types/types.context';
import { chatMock, USER_ID, SERVER_ID } from 'templates';
import { socket } from 'utils/websocket';

const useChat = () => {
    const [ chat, setChat ] = useState<iChat>(chatMock);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ userId, setUserId ] = useState(USER_ID());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ serverId, setServerrId ] = useState(SERVER_ID);

    const WS = useMemo(() => ({
        prepareMessage(type: string, msg = '') {
            return {
                [type]: {
                    'fromUserId': userId,
                    'toServerKey': serverId,
                    'message': msg,
                    'date': Date.now(),
                }
            }
        },
        sendMessage(message: iWebSocketMessage) {
            socket.send(JSON.stringify(message));
        }
    }), [userId, serverId]);

    useEffect(() => {
        // ✅ send registration information to server
        const message = WS.prepareMessage('register user');
        WS.sendMessage(message);
    }, [WS])

    const context = useMemo(() => ({
        chat,
        setChat,
        userId,
        serverId,
        WS
    }), [chat, userId, serverId, WS]);

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
