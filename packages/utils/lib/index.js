"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeContentEditableAttr = exports.groupObjectsInArray = void 0;
/**
 *
 * @param arr Array of objects
 * @param key key of object
 * @returns Array of Array of grouped objects
 */
function groupObjectsInArray(arr, key) {
    const GROUPED = arr.reduce((r, o, i, a) => {
        if (a[i][key] === (a[i - 1] && a[i - 1][key])) {
            r[r.length - 1].push(o);
        }
        else {
            r.push([o]);
        }
        return r;
    }, []);
    return GROUPED;
}
exports.groupObjectsInArray = groupObjectsInArray;
/**
 *
 * @param str incoming html string
 * @returns html string without "contenteditable" attribute
 */
const removeContentEditableAttr = (str) => {
    return str.replaceAll('contenteditable', 'spellcheck');
};
exports.removeContentEditableAttr = removeContentEditableAttr;
