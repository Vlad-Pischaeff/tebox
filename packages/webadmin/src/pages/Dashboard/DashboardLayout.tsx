import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from 'store/hook';
import { logout, selectCurrentUser } from 'store/slices/auth';
import { useLazyUsersQuery } from 'store/api/usersApi';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import * as UI from 'components/ui';
import s from './DashboardLayout.module.sass';

export const DashboardLayout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetMessagesQuery(user.id);
    const [ trigger, { isLoading } ] = useLazyUsersQuery();

    console.log('Profile..data..', data);

    const Logout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    }

    const handlerGetUsers = async () => {
        const data = await trigger('', false);
        if ( data.status === "rejected") {
            Logout();
        }
    }

    return (
        <>
            <UI.Aside />
            <section className="layout">

                <UI.Header />

                <article className="content">
                    { isLoading && <div className={s.loader}></div> }
                    { isLoading &&
                        <input type="button" value="Get users" onClick={handlerGetUsers}/>
                    }
                    <Outlet />
                </article>

                <UI.Footer />

            </section>
        </>
    );
};
