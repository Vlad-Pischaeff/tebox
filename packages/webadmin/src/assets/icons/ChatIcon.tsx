import React from 'react';
import s from './StyleTypeO.module.sass';

export const ChatIcon = ({ active }: { active: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>
        <svg className={s.fillStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id="x0020_4">
                <path className={`${s.strokeStyle} ${active ? s.active : ''}`} d="M900 625c0,68.64 -54.3,110 -117.5,110l-282.5 0 -245.5 165 -0.25 -165 -39.75 0c-58.2,0 -114.5,-45.3 -114.5,-109.9l0 -349c0,-59.33 36,-105 114.5,-106l568 0c71.5,5 117.5,57.33 117.5,106l0 349z"/>
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="214.5" y1="367" x2="500" y2= "367" />
                <line className={`${s.strokeStyle} ${active ? s.active : ''}`} x1="216" y1="535" x2="784" y2= "535" />
            </g>
        </svg>
    </div>
);
