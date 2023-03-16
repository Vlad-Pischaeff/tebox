// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { iMngProfile } from 'types/types.context';
import { SS } from 'templates';

export const useManagerProfile = () => {
    const [ mngProfile, setMngProfile ] = useState<iMngProfile>();

    useEffect(() => {
        if (!mngProfile) {
            const profile = SS.getMngProfile();
            setMngProfile(profile);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (mngProfile) {
            SS.saveMngProfile(mngProfile);
        }
    }, [mngProfile]);


    return ({
        mngProfile,
        setMngProfile,
    });
};
