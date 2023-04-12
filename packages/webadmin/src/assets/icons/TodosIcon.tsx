import React from 'react';
import s from './StyleTypeIV.module.sass';

export const TodosIcon = ({ active }: { active: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0,0,256,256">
            <g className={s.body}>
                <g transform="scale(5.12,5.12)">
                    <path d="M13.21484,5.38281l-5.84766,7.46484l-2.70312,-2.39453l-1.32812,1.49609l4.29688,3.80469l7.15234,-9.13672zM19,10v2h27v-2zM19,24v2h27v-2zM19,38v2h27v-2z"></path>
                </g>
            </g>
        </svg>
    </div>
);
