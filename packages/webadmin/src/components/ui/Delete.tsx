import React from 'react';
import s from './Delete.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    checked?: boolean,
    onClick?: () => void
}

export const Delete = ({ checked, onClick }: iProps) => {
    return (
        <div className={s.container} onClick={onClick}>
            <div className={`${checked ? s.itemDone : s.item}`}>
                &nbsp;
            </div>
        </div>
    );
};
