import { config } from "config";

const PROTO = window.location.protocol === 'https:'
    ? 'wss:'
    : 'ws:'

const url = `${PROTO}//${config.SERVER_ADDR}:${config.SERVER_PORT}/ws`;

export const socket = new WebSocket(url);

socket.onopen = () => {
    console.log('✅ APP client connected ... ');
}
