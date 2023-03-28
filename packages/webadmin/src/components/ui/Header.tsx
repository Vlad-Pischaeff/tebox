import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from 'store/hook';
import { websitesApi } from 'store/api/websitesApi';
import { answersApi } from 'store/api/answersApi';
import { notesApi } from 'store/api/notesApi';
import { todosApi } from 'store/api/todosApi';
import { logout, setSelectedUserId } from 'store/slices/auth';
import s from './Header.module.sass';

export const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handlerLogout = () => {
        dispatch(todosApi.util.resetApiState());
        dispatch(notesApi.util.resetApiState());
        dispatch(answersApi.util.resetApiState());
        dispatch(websitesApi.util.resetApiState());
        dispatch(setSelectedUserId(''));
        dispatch(logout());
        navigate("/", { replace: true });
    }

    return (
        <nav className={s.flexHeader}>

            <div>
                { pathname.match(/dashboard/i) &&
                    <p>Dashboard</p>
                }
            </div>

            <div>
                { (pathname === '/' || pathname ==='/login') &&
                    <p><Link to="signup">Sign up</Link></p>
                }
                { pathname === '/signup' &&
                    <p><Link to="login">Login</Link></p>
                }
                { pathname === '/restore' &&
                    <p><Link to="login">Back</Link></p>
                }
                { pathname.match(/profile/i) &&
                    // eslint-disable-next-line
                    <p><Link to={-1 as any}>Back</Link></p>
                }
                { pathname.match(/dashboard/i) &&
                    <p onClick={handlerLogout}><Link to="">Logout</Link></p>
                }
            </div>
        </nav>
    );
};
