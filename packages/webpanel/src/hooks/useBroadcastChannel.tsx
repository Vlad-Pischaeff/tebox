// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { useActions } from './useActions';

export const useBroadcastChannel = () => {
    const { actions } = useActions();
    const [ BC, setBC ] = useState<BroadcastChannel>();

    useEffect(() => {
        const bc = new BroadcastChannel('swListener');
        setBC(bc);
    }, []);

    useEffect(() => {
        if (BC) {
            BC.onmessage = (e: MessageEvent) => {
                actions.run(e.data);
                console.log('✈️ BroadcastChannel onmessage..', e.data);
            };
        }
    }, [BC, actions]);

    return ({
        BC
    });
};
