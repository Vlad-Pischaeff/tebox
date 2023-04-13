import React from 'react';
import { useWebsitesQuery, useGetMonitoredWebsitesQuery } from 'store/api/websitesApi';
import { OwnWebsitesItem } from './OwnWebsiteItem';
import s from '../Services.module.sass';

export const Websites = () => {
    const { data: monitoredSites } = useGetMonitoredWebsitesQuery();
    const { data: ownSites } = useWebsitesQuery();

    console.log('data..', monitoredSites, ownSites)

    return (
        <>
            <div className={s.Main}>
                { monitoredSites?.length === 0 && ownSites?.length === 0 &&
                    <div className={s.MainPlaceholder}>
                        <p>No Websites..You can add website in Your profile..</p>
                    </div>
                }
                { ownSites && ownSites?.length !== 0 &&
                    ownSites.map(item => (
                        <div key={item.id}>
                            <OwnWebsitesItem item={item} />
                        </div>
                    ))
                }
            </div>

            <div className={s.Footer}>
                Websites service footer
            </div>
        </>
    );
};
