let ws, userId, serverId, timeInterval = 5000, timerId;
const BC = new BroadcastChannel('swListener');

if (typeof self.skipWaiting === 'function') {
    console.log('self.skipWaiting() is supported.');
    self.addEventListener('install', function(e) {
      // See https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-global-scope-skipwaiting
        e.waitUntil(self.skipWaiting());
    });
    self.addEventListener('message', function(e) {
        e.waitUntil(self.skipWaiting());
    });
} else {
    console.log('self.skipWaiting() is not supported.');
}

if (self.clients && (typeof self.clients.claim === 'function')) {
    console.log('self.clients.claim() is supported.');
    self.addEventListener('activate', function(e) {
      // See https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#clients-claim-method
        e.waitUntil(self.clients.claim());
    });
} else {
    console.log('self.clients.claim() is not supported.');
}

//-------------------------------------------
self.addEventListener('fetch', event => {
    console.log('--fetch');
});
//--------------------------------------------

BC.addEventListener('message', e => {
    // console.log('✈️ message..', e.data);
    if ('INIT_WS' in e.data) {
        console.log('✈️ INIT WebSocket..', e.data['INIT_WS']);
        const { message, from, to } = e.data['INIT_WS'];
        url = message;
        userId = from;
        serverId = to;
        wsConnect(url);
    }
    if ('MSG_FROM_CLIENT' in e.data) {
        ws.send(JSON.stringify(e.data));
    }
    if ('MAIL_FROM_CLIENT' in e.data) {
        ws.send(JSON.stringify(e.data));
    }
});

function wsConnect(url) {
    if (!ws) {
        ws = new WebSocket(url);
        console.log('🌏 WebSocket initialized..', url, userId, serverId);

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            BC.postMessage(msg);
            console.log('--ws onmessage..', event.data);
        };

        ws.onopen = () => {
            clearTimeout(timerId);
            // 2 step. Send registration message on socket opened
            const msg = BC.prepareMessage('REGISTER_CLIENT', 'null');
            ws.send(JSON.stringify(msg));
            console.log('--ws onopen msg..', msg);
        };

        // ws.onerror = () => {
        //   console.log('--ws ошибка...');
        // }

        ws.onclose = () => {
            // console.log('--ws закрыт...');
            // try to reconnect
            timerId = setTimeout(() => wsConnect(url), timeInterval);
        };
    }
};

BC.prepareMessage = function(type, msg = '') {
    return {
        [type]: {
            'from': userId,
            'to': serverId,
            'message': msg,
            'date': Date.now(),
        }
    }
};
