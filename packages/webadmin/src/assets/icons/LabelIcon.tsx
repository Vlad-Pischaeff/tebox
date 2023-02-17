import React from 'react';
import s from './LabelIcon.module.sass';

export const LabelIcon = ({ fill = 'none' }: { fill?: string }) => (
    <div className={s.svg}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id="x0020_7">
                <polygon className={s.strokeStyle} style={{ fill: fill }} points="100,420 100,100 420,100 901,582 582,901 "/>
                <circle className={s.strokeStyle} cx="265" cy="265" r="30"/>
            </g>
        </svg>
    </div>
);
