import React from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { useWebsitesQuery } from 'store/api/websitesApi';
import { selectYourId } from 'store/slices/auth';
import { setServicesModal, eModal } from 'store/slices/ui';
import { ProfileWebsitesItem } from './ProfileWebsitesItem';
import s from './Profile.module.sass';

export const ProfileWebsites = () => {
    const yourId = useAppSelector(selectYourId);
    const dispatch = useAppDispatch();
    const { data, isSuccess, isLoading } = useWebsitesQuery({ userId: yourId } ?? skipToken);

    const openModalAddSite = () => {
        dispatch(setServicesModal(eModal.addSite));
    }

    return (
        <div className={s.ManagedSitesSubContainer}>
            <div className={s.ItemsListTitle}>
                <p>Web-sites:</p>
                <input
                    type="button"
                    className={s.AddItem}
                    value="+ add site"
                    onClick={openModalAddSite} />
            </div>

            <div className={s.ItemsContainer} role="listbox">
                { !!data && isSuccess && (
                    data.length === 0
                        ?   <div className={s.MainPlaceholder} role="listitem">
                                <p>No managed sites...</p>
                            </div>
                        :   data.map(item => (
                                <div key={item.key} role="listitem">
                                    <ProfileWebsitesItem item={item} />
                                </div>
                            ))
                )}
            </div>

            { isLoading && <div>Loading...</div> }
        </div>
    );
};
