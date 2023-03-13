let ws, userId, serverId, timeInterval = 5000, timerId;
const BC = new BroadcastChannel('swListener');

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
});

function wsConnect(url) {
    ws = new WebSocket(url);
    console.log('🌏 WebSocket initialized..', url, userId, serverId);

    ws.onmessage = (event) => {
        // BC.postMessage(event.data);
        console.log('--ws onmessage..', event.data);
    };

    ws.onopen = () => {
        clearTimeout(timerId);
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
