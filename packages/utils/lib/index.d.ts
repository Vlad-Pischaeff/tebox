/**
 *
 * @param arr Array of objects
 * @param key key of object
 * @returns Array of Array of grouped objects
 */
export declare function groupObjectsInArray<T, K extends keyof T>(arr: T[], key: K): T[][];
/**
 *
 * @param str incoming html string
 * @returns html string without "contenteditable" attribute
 */
export declare const removeContentEditableAttr: (str: string) => string;
