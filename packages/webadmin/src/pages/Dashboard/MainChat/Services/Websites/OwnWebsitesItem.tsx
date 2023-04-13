import React from 'react';
import { useGetOnlineUsersNumberQuery } from 'store/api/websitesApi';
import { iWebsites } from 'store/api/apiTypes';
import { Icons } from '@tebox/assets';
import s from '../Services.module.sass';

interface iProps {
    item: iWebsites
}

export const OwnWebsitesItem = ({ item }: iProps) => {
    const { data: usersCount } = useGetOnlineUsersNumberQuery(item.hash.substring(7),
        {
            pollingInterval: 30000,
        });

    return (
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
                {usersCount}
                {item.onlineUsersCounter}
            </p>
        </div>
    );
};
