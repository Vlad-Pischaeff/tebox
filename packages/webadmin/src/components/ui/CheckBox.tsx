import React from 'react';
import s from './CheckBox.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    checked: boolean,
    onChange: () => void,
    idx: number | string
}

export const CheckBox = ({ checked, idx, onChange }: iProps) => {
    return (
        <div className={s.container}>
            <input type="checkbox" id={`cb-${idx}`} checked={checked} onChange={onChange} />
            <label htmlFor={`cb-${idx}`} className={s.checkbox} />
        </div>
    );
};
