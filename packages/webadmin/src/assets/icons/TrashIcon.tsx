import React from 'react';
import s from './TrashIcon.module.sass';

export const TrashIcon = () => (
    <div className={s.svg}>
        <svg className={s.fillStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id="x0020_5">
                <path className={s.strokeStyle} d="M230 352l0 421c0,56 56,114 114,114l316 0c63,0 110,-50 110,-114l0 -421"/>
                <line className={s.strokeStyle} x1="420" y1="422" x2="420" y2="694" />
                <line className={s.strokeStyle} x1="575" y1="422" x2="575" y2="694" />
                <line className={s.strokeStyle} x1="185" y1="235" x2="815" y2="235" />
                <polyline className={s.strokeStyle} points="382,235 382,114 608,114 608,235"/>
            </g>
        </svg>
    </div>
);
