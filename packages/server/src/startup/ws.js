'use strict';

const WebSocket = require('ws');
const { DISPATCHER } = require('#s/helpers/index');

module.exports = async (server) => {
    try {
        const wss = new WebSocket.Server({ server , path: '/ws'});
        console.log('🚀 WS server -> listen');

        wss.on('connection', async (ws, req) => {
            ws.isAlive = true;
            ws.id = 'server';

            console.log('✅ WS connection');

            ws.on('message', async message => {
                let data = JSON.parse(message);
                console.log('🧭 WS MSG DATA..', data);
                const key = Object.keys(data);
                DISPATCHER[key](ws, data);
            });

            ws.on('pong', () => {
                ws.isAlive = true;
            });
        })

        setInterval(() => {
            wss.clients.forEach(ws => {
                ws.isAlive = false;
                ws.ping();
                DISPATCHER.MSG_FROM_MANAGER(ws, 'test message');
            });
        }, 30000);

    } catch (e) {
        console.log('❌ WS SERVER errors...', e);
    }
};
