import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import * as ICON from 'assets/icons';
import s from './UserLogo.module.sass';

export const UserLogo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    const showProfile = () => {
        // чтобы маршрут не попадал в историю 2 и более раз
        if (location.pathname !== "/dashboard/profile") {
            navigate("/dashboard/profile");
        }
    }

    return (
        <div className={s.userContainer} onClick={showProfile}>
            { data &&
                <>
                    { data.image !== ''
                        ? <img src={data.image} className={s.userImage} alt="avatar" />
                        : <ICON.ProfileIcon />
                    }
                    <p>{data.name}</p>
                </>
            }
        </div>
    );
};
