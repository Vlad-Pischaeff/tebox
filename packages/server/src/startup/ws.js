'use strict';

const WebSocket = require('ws');

module.exports = async (server) => {
    try {
        const wss = new WebSocket.Server({ server , path: '/ws'});
        console.log('🚀 WS server -> listen');

        wss.on('connection', (ws, req) => {
            ws.isAlive = true;

            ws.on('message', message => {
                let data = JSON.parse(message);
                console.log('👍 ws message...', data);
            })

            ws.on('pong', () => {
                ws.isAlive = true;
            })

            // ws.on('close', () => {
            //     console.log('ws Close...', tradeWeakMap.get(ws));
            // })
        })

        setInterval(() => {
            wss.clients.forEach(ws => {
                ws.isAlive = false;
                ws.ping();
            });
        }, 3000);

    } catch (e) {
        console.log('WS SERVER errors...', e);
    }
};
