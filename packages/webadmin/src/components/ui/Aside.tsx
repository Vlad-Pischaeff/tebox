import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectYourId } from 'store/slices/auth';
import { UserLogo } from './UserLogo';
import s from './Aside.module.sass';

export const Aside = () => {
    const yourId = useAppSelector(selectYourId);

    return (
        <aside className={yourId ? s.AsideGradient : s.Aside}>
            <UserLogo />
        </aside>
    );
};
