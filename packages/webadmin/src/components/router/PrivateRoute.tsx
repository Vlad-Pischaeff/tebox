import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector} from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';

interface iProps { children: React.ReactElement | null }

export const PrivateRoute = ({ children }: iProps) => {
    const user = useAppSelector(selectCurrentUser);

	// if (loading) return <div>loading...</div>;

	return user.id
        ? children
        : <Navigate to="/" />;
};
