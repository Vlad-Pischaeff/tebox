import React from 'react';
import s from './StyleTypeO.module.sass';

export const MailIcon = ({ active }: { active: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>
        <svg className={s.fillStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id="x0020_3">
                <polygon className={`${s.strokeStyle} ${active ? s.active : ''}`} points="900,830 100,830 100,170 900,170 "/>
                <polyline className={`${s.strokeStyle} ${active ? s.active : ''}`} points="900,170 500,540.47 100,170 "/>
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="100" y1="830" x2="442" y2= "488" />
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="900" y1="830" x2="557" y2= "487" />
            </g>
        </svg>
    </div>
);
