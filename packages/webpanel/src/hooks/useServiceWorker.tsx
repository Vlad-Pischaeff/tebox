// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { isServiceWorkerEnabled, isServiceWorkerActivated } from 'utils';

export const useServiceWorker = () => {
    const [ SW, setSW ] = useState<ServiceWorker>();    // Service Worker object
    const [ isSWReady, setSWReady] = useState(false);   // "true" when Service Worker activated

    useEffect(() => {
        initServiceWorker();
    }, []);

    useEffect(() => {
        if (SW) {
            if (SW?.state === 'activated') {
                // 1 step. Initialize WebSocket after ServiceWorker has been already activated
                setSWReady(true);
            }
            SW.onstatechange = (e: Event) => {
                if (isServiceWorkerActivated(e)) {
                    // 1 step. Initialize WebSocket for the first time loading
                    setSWReady(true);
                    console.log('✈️ Service Worker state..', SW?.state);
                }
            };
        }
        console.log('☘️ Service Worker state..', SW?.state);
    }, [SW]);

    const initServiceWorker = () => {
        if (isServiceWorkerEnabled()) {
            navigator.serviceWorker.register('sw1965.js', {scope: './'})
                .then((registration) => {
                    console.log('🚦 Service Worker registration..');

                    if (registration.installing) {
                        setSW(registration.installing);
                    } else if (registration.waiting) {
                        setSW(registration.waiting);
                    } else if (registration.active) {
                        setSW(registration.active);
                    }
                })
                .catch((error) => {
                    console.log('💥 failed: ', error);
                });
        }
    };

    return ({
        SW,
        isSWReady,
    });
};
