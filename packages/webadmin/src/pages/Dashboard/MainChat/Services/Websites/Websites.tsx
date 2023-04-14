import React from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppSelector } from 'store/hook';
import { selectYourId } from 'store/slices/auth';
import { useWebsitesQuery, useGetMonitoredWebsitesQuery } from 'store/api/websitesApi';
import { OwnWebsitesItem } from './OwnWebsitesItem';
import { MonitoredWebsitesItem } from './MonitoredWebsitesItem';
import s from '../Services.module.sass';

export const Websites = () => {
    const yourId = useAppSelector(selectYourId);
    const { data: monitoredSites } = useGetMonitoredWebsitesQuery({ userId: yourId } ?? skipToken);
    const { data: ownSites } = useWebsitesQuery({ userId: yourId } ?? skipToken,{
        pollingInterval: 30000,
    });

    // console.log('Websites..', ownSites, monitoredSites)
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
                { monitoredSites && monitoredSites?.length !== 0 &&
                    monitoredSites.map(siteId => (
                        <div key={siteId}>
                            <MonitoredWebsitesItem siteId={siteId} />
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
