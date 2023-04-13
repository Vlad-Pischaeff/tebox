'use strict';

const WebSocket = require('ws');
const WebsitesService = require('#s/services/WebsitesService');
const { DISPATCHER, MAPS } = require('#s/services/websocketService');

module.exports = async (server) => {
    try {
        const wss = new WebSocket.Server({ server , path: '/ws'});
        console.log('🚀 WS server -> listen');

        wss.on('connection', async (ws, req) => {
            ws.isAlive = true;
            ws.id = 'server';
            MAPS.set(ws, 'server');

            console.log('✅ WS connection');

            ws.on('message', async (message) => {
                DISPATCHER.run(ws, message);
            });

            ws.on('pong', () => {
                ws.isAlive = true;
            });

            ws.on('close', () => {
                const id = MAPS.getID(ws);
                if (id && 'ID' in id) {
                    MAPS.delete(ws, id.ID);
                    WebsitesService.delWebsiteUser(id.HASH, id.ID);
                }
                console.log(`❌ WS connection id=${JSON.stringify(id)} closed..`);
            });
        });

        setInterval(() => {
            wss.clients.forEach(ws => {
                console.log('🔹 ws heartbeat..', ws.id);
                ws.isAlive = false;
                ws.ping();
                DISPATCHER.MSG_FROM_SERVER(ws, 'test message');
            });
        }, 29661);

    } catch(e) {
        console.log('❌ WS SERVER errors...', e);
    }
};
