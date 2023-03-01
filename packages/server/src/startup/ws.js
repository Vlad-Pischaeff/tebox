'use strict';

const WebSocket = require('ws');

module.exports = async (server) => {
    try {
        const wss = new WebSocket.Server({ server , path: '/ws'});
        console.log('🚀 WS server -> listen');

        wss.on('connection', (ws, req) => {
            ws.isAlive = true;

            console.log('✅ WS connection');

            ws.on('message', message => {
                let data = JSON.parse(message);
                console.log('🔵 ws message...', data);
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
                const MSG = {
                    'MSG FROM MANAGER': {
                        'to': 'qtwppJ9mif5wMlEmQm4QlgZdNHVcTUIx',
                        'from': '0eidy3BTCn7TnLKUpGCr094hNXzYKhWN',
                        'message': 'test message',
                        'date': Date.now()
                    }
                };
                ws.send(JSON.stringify(MSG));
            });
        }, 30000);

    } catch (e) {
        console.log('WS SERVER errors...', e);
    }
};
