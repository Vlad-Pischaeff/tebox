import React from 'react';
import { useChatContext } from 'store';
import s from 'styles/ManagerProfile.module.sass';

export const ManagerProfile = () => {
    const { mngProfile } = useChatContext();

    if (mngProfile) {
        return (
            <>
                <figure className={s.avatar}>
                    <img src={mngProfile.image} alt="avatar" />
                </figure>
                <div className={s.description}>
                    {mngProfile.alias ? mngProfile.alias : mngProfile.name}
                </div>
                <div className={s.menu}>
                    service menu
                </div>
            </>
        )
    } else {
        return (
            <div className={s.loader}>Loading manager profile...</div>
        )
    }
};
