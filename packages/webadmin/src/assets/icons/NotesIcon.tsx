import React from 'react';
import s from './StyleTypeO.module.sass';

export const NotesIcon = ({ active }: { active: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>
        <svg className={s.fillStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id="x0020_2">
                <polygon className={`${s.strokeStyle} ${active ? s.active : ''}`} points="442,100 830,100 830,900 170,900 170,364 "/>
                <polyline className={`${s.strokeStyle} ${active ? s.active : ''}`} points="442,100 442,364 172,364 "/>
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="588" y1="285" x2="680" y2="285" />
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="294" y1="513" x2="680" y2="513" />
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="294" y1="683" x2="680" y2="683" />
            </g>
        </svg>
    </div>
);
