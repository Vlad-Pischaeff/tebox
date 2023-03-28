import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectYourId } from 'store/slices/auth';
import { ProfileDescriptions } from './ProfileDescriptions';
import { ProfileImage } from './ProfileImage';
import { ProfileWebsites } from './ProfileWebsites';
import { ProfileTeam } from './ProfileTeam';
import { ProfileModals } from './ProfileModals';
import s from './Profile.module.sass';

export const Profile = () => {
    const yourId = useAppSelector(selectYourId);
    const { data } = useGetUserQuery(yourId, { skip: !yourId });

    return (
        <div className={s.Container}>

            <ProfileModals />

            { data &&
                <>
                    <div className={s.LeftSubContainer}>
                        <div style={{ width: '100%' }}>
                            <ProfileImage user={data} />
                            <ProfileDescriptions user={data} />
                        </div>
                    </div>

                    <div className={s.RightSubContainer}>
                        <ProfileWebsites />
                        <br/>
                        <ProfileTeam user={data} />
                    </div>
                </>
            }
        </div>
    );
};
