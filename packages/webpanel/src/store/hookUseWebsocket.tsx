// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { config } from 'config';

export const useWebsocket = () => {
    const [ socket, setSocket ] = useState<WebSocket>();

    useEffect(() => {
        const s = new WebSocket(config.WEBSOCKET_ADDR);
        setSocket(s);
    }, [])

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log('✅ tebox panel connected ... ');
            }
        }
    }, [socket])

    return socket;
}
