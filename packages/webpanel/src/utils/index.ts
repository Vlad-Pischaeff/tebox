/**
 *
 * @param arr array of values ..................... [1,3,6,4,4,5,7,55,32,23,4,3]
 * @param val value ............................... 4
 * @returns {arr} all indexes of value in array ... [3,4,10]
 */
// eslint-disable-next-line
export const indexOfAll = (arr: any[], val: any) => {
    return arr.reduce((acc, el, i) => (
            el.from === val ? [...acc, i] : acc
        ), []
    );
}
/**
 *
 * @returns {true} if Browser supports Service Worker
 */
export const isServiceWorkerEnabled = () => {
    if ('serviceWorker' in navigator) {
        return true;
    } else {
        console.log('💥 The current browser doesn\'t support service workers');
        return false;
    }
}
/**
 *
 * @returns {true} if Service Worker activated
 */
export const isServiceWorkerActivated = (e: Event) => {
    return  e.target &&
            'state' in e.target &&
            e.target.state === 'activated';
};

class EventEmitter {
    // eslint-disable-next-line
    on = (eventName: string, callback: any) => window.addEventListener(eventName, callback, false)
    // eslint-disable-next-line
    off = (eventName: string, callback: any) => window.removeEventListener(eventName, callback, false)
    // eslint-disable-next-line
    emit = (eventName: string, data: any) => window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export const emitter = new EventEmitter();
