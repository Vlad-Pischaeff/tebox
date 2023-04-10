import React from 'react';
import { Todos } from 'pages/Dashboard/MainChat/Services/Todos';
import { Mail } from 'pages/Dashboard/MainChat/Services/Mail';
import { Notes } from 'pages/Dashboard/MainChat/Services/Notes';
import { Answers } from 'pages/Dashboard/MainChat/Services/Answers';

export const MENU = [ "Todos", "Notes", "Mail", "Answers" ] as const;

export type tServiceMenu = typeof MENU[number];

type tSymbol = {
    [key in tServiceMenu]: () => JSX.Element
}

export const BODY = [
    { name: MENU[0], render: () => <Todos /> },
    { name: MENU[1], render: () => <Notes /> },
    { name: MENU[2], render: () => <Mail /> },
    { name: MENU[3], render: () => <Answers /> },
];

export const BODY_OBJ = BODY.reduce((next: tSymbol, val) => {
    next[val.name] = val.render;
    return next;
}, {} as tSymbol);
