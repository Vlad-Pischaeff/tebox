// eslint-disable-next-line
import React, { useEffect, useState, useRef } from "react";
import { isServiceWorkerEnabled, isServiceWorkerActivated } from 'utils';

export const useServiceWorker = () => {
    const [ isSWReady, setSWReady] = useState(false);   // "true" when Service Worker activated
    const sw = useRef<ServiceWorker>();

    useEffect(() => {
        initServiceWorker();
        // eslint-disable-next-line
    }, []);

    const initServiceWorker = () => {
        if (isServiceWorkerEnabled()) {
            navigator.serviceWorker.register('sw1965.js', {scope: './'})
                .then((registration) => {
                    console.log('🚦 Service Worker registration..');

                    if (registration.installing) {
                        sw.current = registration.installing;
                        // console.log('1️⃣ --SWorker..', sw.current);
                    } else if (registration.waiting) {
                        sw.current = registration.waiting;
                        // console.log('2️⃣ --SWorker..', sw.current);
                    } else if (registration.active) {
                        sw.current = registration.active;
                        // console.log('3️⃣ --SWorker..', sw.current);
                    }

                    !!sw.current && swActivate(sw.current);
                })
                .catch((error) => {
                    console.log('💥 failed: ', error);
                });
        }
    };

    const swActivate = (SW: ServiceWorker) => {
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
    }

    return ({
        isSWReady,
    });
};
