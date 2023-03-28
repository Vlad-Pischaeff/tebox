import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from 'store/hook';
import { selectYourId } from 'store/slices/auth';
import * as UI from 'components/ui';

export const AuthPage = () => {
    const navigate = useNavigate();
    const yourId = useAppSelector(selectYourId);

    useEffect(() => {
        yourId &&
            navigate("/dashboard/main", { replace: true });
    }, [yourId, navigate]);

    return (
        <>
            <UI.Aside />
            <section className="layout">

                <UI.Header />

                <article className="content">
                    <Outlet />
                </article>

                <UI.Footer />

            </section>
        </>
    );
};
