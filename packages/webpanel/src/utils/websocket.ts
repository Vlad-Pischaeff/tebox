import { config } from "config";

const PROTO = window.location.protocol === 'https:'
    ? 'wss:'
    : 'ws:'

const url = `${PROTO}//${config.SERVER_ADDR}:${config.SERVER_PORT}/ws`;

export const socket = new WebSocket(url);

export const SocketSend = (message: any) => {
    socket.send(JSON.stringify(message));
}

socket.onopen = () => {
    console.log('✅ tebox panel connected ... ');
}
