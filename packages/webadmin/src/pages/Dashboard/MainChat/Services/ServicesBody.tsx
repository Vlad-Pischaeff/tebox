import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIState } from 'store/slices/ui';
import { BODY_OBJ } from './ServicesVariables';
import s from './Services.module.sass';

export const ServicesBody = () => {
    const services = useAppSelector(selectUIState('services'));

    return (
        <div className={s.body}>
            { BODY_OBJ[services]() }
        </div>
    );
};
