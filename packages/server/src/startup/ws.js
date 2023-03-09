'use strict';

const WebSocket = require('ws');
const { getMappedHashSites } = require('#s/helpers/index');
const wsClientsMap = new WeakMap();

module.exports = async (server) => {
    try {
        const wss = new WebSocket.Server({ server , path: '/ws'});
        console.log('🚀 WS server -> listen');

        wss.on('connection', async (ws, req) => {
            ws.isAlive = true;

            console.log('✅ WS connection');

            ws.on('message', message => {
                let data = JSON.parse(message);
                console.log('🔵 ws message...', data);
                if ('REGISTER_CLIENT' in data) {
                    wsClientsMap.set(ws, data['REGISTER_CLIENT'].from);

                    const siteHash = data['REGISTER_CLIENT'].message;
                    const mappedHashSites = getMappedHashSites();

                    const site = mappedHashSites[`$2a$10$${siteHash}`];
                    const ownerId = site.ownerId;
                    console.log('🔵 ws REGISTER_CLIENT...', site.siteName, ownerId);
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

                const TO = wsClientsMap.get(ws);
                const MSG = {
                    'MSG_FROM_MANAGER': {
                        'to': TO,
                        'from': 'server',
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
