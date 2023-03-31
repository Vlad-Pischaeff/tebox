/**
 *
 * @param arr Array of objects
 * @param key key of object
 * @returns Array of Array of grouped objects
 */
export function groupObjectsInArray<T, K extends keyof T>(arr: T[], key: K) {

    const GROUPED = arr.reduce((r: T[][], o: T, i: number, a: T[]) => {
        if (a[i][key] === (a[i - 1] && a[i - 1][key])) {
            r[r.length - 1].push(o);
        } else {
            r.push([o]);
        }
        return r;
    }, []);

    return GROUPED;
}
/**
 *
 * @param str incoming html string
 * @returns html string without "contenteditable" attribute
 */
export const removeContentEditableAttr = (str: string) => {
    return str.replaceAll('contenteditable', 'spellcheck');
};
