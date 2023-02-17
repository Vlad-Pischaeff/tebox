export const log = console.log.bind(console);

export const removeContentEditableAttr = (str: string) => {
    return str.replaceAll('contenteditable', 'spellcheck');
};


export const checkIfImageExists = (url: string): boolean | undefined  => {
    const img = new Image();
    img.src = url;

    if (img.complete) {
        return true;
    } else {
        img.onload = () => {
            return true;
        };

        img.onerror = () => {
            return false;
        };
    }
};

export const asyncImageLoader = (url: string) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('could not load image'));
    });
};
