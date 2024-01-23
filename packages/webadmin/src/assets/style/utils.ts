import config from "@tebox/config/client";

const theme = {
    dark: {
        "--C1": "#3F8A8C",
        "--C2": "#0C5679",
        "--C3": "#E5340B",
        "--C4": "#F28A0F",
        "--C5": "#FFE7BD",
        "--C6": "#B0B0B0",
        "--C7": "#00cad1",
        "--C8": "#646464",
        "--color-BACKGROUND": "#0F1A2B",
        "--color-HOVER": "#305d7240",
        "--color-SHADOW": "#606060aa",
        "--color-INPUTFOCUS": "#fffcc8",
    },
    light: {
        "--C1": "#3F8A8C",
        "--C2": "#FFE7BD",
        "--C3": "#E5340B",
        "--C4": "#F28A0F",
        "--C5": "#0F1A2B",
        "--C6": "gray",
        "--C7": "#00cad1",
        "--C8": "#B0B0B0",
        "--color-BACKGROUND": "ivory",
        "--color-HOVER": "#305d7216",
        "--color-SHADOW": "#a0a0a066",
        "--color-INPUTFOCUS": "#fffcc8",
    },
};

export type tTheme = keyof typeof theme;

export const changeTheme = (selectedTheme: tTheme) => {
    setStyleProperty(theme[selectedTheme]);
};

const vars = {
    "--URL-ASIDE-IMG": `url(${config.URL}/img/image1.jpg)`, // Aside image path
};

export const setSassVars = () => {
    setStyleProperty(vars);
};

const setStyleProperty = (obj: Record<string, string>) => {
    const style = document.documentElement.style;

    Object.entries(obj).forEach(([key, value]) => {
        style.setProperty(key as string, value as string);
    });
};
