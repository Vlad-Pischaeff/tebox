// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { emitter } from 'utils';

export const useBroadcastChannel = () => {
    const [ BC, setBC ] = useState<BroadcastChannel>();

    useEffect(() => {
        const bc = new BroadcastChannel('swListener');
        setBC(bc);
    }, []);

    useEffect(() => {
        if (BC) {
            BC.onmessage = (e: MessageEvent) => {
                emitter.emit('RUN_ACTION', e.data)
                console.log('✈️ BroadcastChannel onmessage..', e.data);
            };
        }
    }, [BC]);

    return ({
        BC
    });
};
