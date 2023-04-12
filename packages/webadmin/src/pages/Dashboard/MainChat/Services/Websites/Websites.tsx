import React from 'react';
import { useWebsitesQuery, useGetMonitoredWebsitesQuery } from 'store/api/websitesApi';
import { Icons } from '@tebox/assets';
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
                        <div key={item.key} className={s.PropertyContainer} role="listitem">
                            <img
                                className={s.PropertyFavIcon}
                                src={`https://${item.site}/favicon.ico`}
                                alt=""
                                onError={(e) => {
                                    e.currentTarget.src = Icons.SVG.Site;
                                }}
                            />
                            <p className={s.PropertySiteName}>
                                {item.site}
                            </p>
                            <img
                                className={s.PropertyFavIcon}
                                src={Icons.SVG.Users3}
                                alt="users"
                            />
                            <p className={s.PropertyUsersCounter}>
                                32
                            </p>
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
