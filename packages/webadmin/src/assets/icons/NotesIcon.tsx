import React from 'react';
import s from './StyleTypeIV.module.sass';

export const NotesIcon = ({ active }: { active: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0,0,256,256">
            <g className={s.body}>
                <g transform="scale(5.12,5.12)">
                    <path d="M7,2v46h36v-33.40625l-0.28125,-0.3125l-12,-12l-0.3125,-0.28125zM9,4h20v12h12v30h-32zM31,5.4375l8.5625,8.5625h-8.5625zM15,22v2h20v-2zM15,28v2h16v-2zM15,34v2h20v-2z"></path>
                </g>
            </g>
        </svg>
    </div>
);
