import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { UserLogo } from './UserLogo';
import s from './Aside.module.sass';

export const Aside = () => {
    const user = useAppSelector(selectCurrentUser);

    return (
        <aside className={user.id ? s.AsideGradient : s.Aside}>
            <UserLogo />
        </aside>
    );
};
