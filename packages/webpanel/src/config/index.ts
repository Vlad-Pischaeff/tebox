const PORT = 5000;
const SERVER = 'localhost';

const PROTO = window.location.protocol === 'https:'
    ? 'wss:'
    : 'ws:'

const URL = `${PROTO}//${SERVER}:${PORT}/ws`;

export const config = {
    'SERVER_PORT': PORT,
    'SERVER_ADDR': SERVER,
    'WEBSOCKET_ADDR': URL
};
