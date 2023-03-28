import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectYourId } from 'store/slices/auth';
import * as ICON from 'assets/icons';
import s from './UserLogo.module.sass';

export const UserLogo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const yourId = useAppSelector(selectYourId);
    const { data } = useGetUserQuery(yourId, { skip: !yourId });

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
