import React from 'react';
import { useWebsitesQuery, useGetMonitoredWebsitesQuery } from 'store/api/websitesApi';
import s from '../Services.module.sass';

export const Websites = () => {
    const { data: monitoredSites } = useGetMonitoredWebsitesQuery();
    const { data: ownSites } = useWebsitesQuery();

    console.log('data..', monitoredSites, ownSites)

    return (
        <>
            <div className={s.Main}>
                <div className={s.MainPlaceholder}>
                    <p>No Websites..You can add website in Your profile..</p>
                </div>
            </div>

            <div className={s.Footer}>
                Websites service footer
            </div>
        </>
    );
};
