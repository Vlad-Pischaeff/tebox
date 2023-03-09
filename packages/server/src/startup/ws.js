'use strict';

const WebSocket = require('ws');
const { CLIENTS_MAP, DISPATCHER } = require('#s/helpers/index');

module.exports = async (server) => {
    try {
        const wss = new WebSocket.Server({ server , path: '/ws'});
        console.log('🚀 WS server -> listen');

        wss.on('connection', async (ws, req) => {
            ws.isAlive = true;

            console.log('✅ WS connection');

            ws.on('message', async message => {
                let data = JSON.parse(message);
                console.log('🧭 WS MSG DATA..', data);
                if ('REGISTER_CLIENT' in data) {
                    DISPATCHER.register_client(ws, data);
                }
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

                DISPATCHER.msg_from_manager(ws, 'test message');
            });
        }, 30000);

    } catch (e) {
        console.log('WS SERVER errors...', e);
    }
};
