import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector} from 'store/hook';
import { selectYourId } from 'store/slices/auth';

interface iProps {
    children: React.ReactElement | null
}

export const PrivateRoute = ({ children }: iProps) => {
    const yourId = useAppSelector(selectYourId);

	// if (loading) return <div>loading...</div>;

	return yourId
        ? children
        : <Navigate to="/" />;
};
