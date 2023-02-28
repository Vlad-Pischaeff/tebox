import { config } from "config";
import { USER_ID, SERVER_ID }  from 'templates';
import { iWebSocketMessage } from 'types/types.context';

const PROTO = window.location.protocol === 'https:'
    ? 'wss:'
    : 'ws:'

const url = `${PROTO}//${config.SERVER_ADDR}:${config.SERVER_PORT}/ws`;

export const socket = new WebSocket(url);

socket.onopen = () => {
    console.log('✅ tebox panel connected ... ');
}

export const WS = {
    prepareMessage(type: string, msg = '') {
        return {
            [type]: {
                'fromUserId': USER_ID(),
                'toServerKey': SERVER_ID,
                'message': msg,
                'date': Date.now(),
            }
        }
    },
    sendMessage(message: iWebSocketMessage) {
        socket.send(JSON.stringify(message));
    },
};
