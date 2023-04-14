import React from 'react';
import { useGetWebsiteQuery } from 'store/api/websitesApi';
import { Icons } from '@tebox/assets';
import s from '../Services.module.sass';

interface iProps {
    siteId: string
}

export const MonitoredWebsitesItem = ({ siteId }: iProps) => {
    const { data: site } = useGetWebsiteQuery(siteId, {
        pollingInterval: 30000,
    });

    return (
        <>
            { !!site &&
                <div key={site.key} className={s.PropertyContainer} role="listitem">
                    <img
                        className={s.PropertyFavIcon}
                        src={`https://${site.site}/favicon.ico`}
                        alt=""
                        onError={(e) => {
                            e.currentTarget.src = Icons.SVG.Site;
                        }}
                    />
                    <p className={s.PropertySiteNameMonitored}>
                        {site.site}
                    </p>
                    <img
                        className={s.PropertyFavIcon}
                        src={Icons.SVG.Users3}
                        alt="users"
                    />
                    <p className={s.PropertyUsersCounter}>
                        {site.onlineUsersCounter}
                    </p>
                </div>
            }
        </>
    );
};
