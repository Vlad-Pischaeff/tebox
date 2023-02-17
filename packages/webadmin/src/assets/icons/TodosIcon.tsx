import React from 'react';
import s from './StyleTypeO.module.sass';

export const TodosIcon = ({ active }: { active: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>
        <svg className={s.fillStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id="x0020_1">
                <polyline className={`${s.strokeStyle} ${active ? s.active : ''}`} points="100,213 187,295 323,133 "/>
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="391" y1="235" x2="900" y2="235" />
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="391" y1="497" x2="900" y2="497" />
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="391" y1="759" x2="900" y2="759" />
            </g>
        </svg>
    </div>
);
