import React from 'react';
import { Todos } from 'pages/Dashboard/MainChat/Services/Todos';
import { Mail } from 'pages/Dashboard/MainChat/Services/Mail';
import { Notes } from 'pages/Dashboard/MainChat/Services/Notes';
import { Answers } from 'pages/Dashboard/MainChat/Services/Answers';
import { Websites } from 'pages/Dashboard/MainChat/Services/Websites';

export const MENU = [ "Todos", "Notes", "Mail", "Answers", "Websites" ] as const;

export type tServiceMenu = typeof MENU[number];

type tMenu = {
    [key in tServiceMenu]: () => JSX.Element
}

export const BODY = [
    { name: MENU[0], render: () => <Todos /> },
    { name: MENU[1], render: () => <Notes /> },
    { name: MENU[2], render: () => <Mail /> },
    { name: MENU[3], render: () => <Answers /> },
    { name: MENU[4], render: () => <Websites /> },
];

export const BODY_OBJ = BODY.reduce((next: tMenu, val) => {
    next[val.name] = val.render;
    return next;
}, {} as tMenu);
