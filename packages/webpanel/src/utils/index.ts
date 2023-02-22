/**
 *
 * @param arr array of values ... [1,3,6,4,4,5,7,55,32,23,4,3]
 * @param val value ... 4
 * @returns all indexes of value in array ... [3,4,10]
 */
export const indexOfAll = (arr: any[], val: any) => {
    return arr.reduce((acc, el, i) => (
            el.from === val ? [...acc, i] : acc
        ), []
    );
}
