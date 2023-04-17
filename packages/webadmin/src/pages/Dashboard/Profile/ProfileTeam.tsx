import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { ProfileTeamMember } from './ProfileTeamMember';
import { tUser } from 'store/api/apiTypes';
import s from './Profile.module.sass';

interface iProps {
    user: tUser
}

export const ProfileTeam = ({ user }: iProps) => {
    const dispatch = useAppDispatch();

    const openModalAddMember = () => {
        dispatch(setServicesModal(eModal.addMember));
    }

    return (
        <div className={s.ManagedTeamSubContainer}>
            <div className={s.ItemsListTitle}>
                <p>My team members:</p>
                <input
                    type="button"
                    className={s.AddItem}
                    value="+ add new member"
                    onClick={openModalAddMember} />
            </div>

            <div className={s.ItemsContainer} role="listbox">
                { !!user && user.team.length === 0
                    ?   <div className={s.MainPlaceholder} role="listitem">
                            <p>No members...</p>
                        </div>
                    :   user.team.map(item => (
                            <div key={item.member} role="listitem">
                                <ProfileTeamMember user={item} />
                            </div>
                        ))
                }
            </div>
        </div>
    );
};
