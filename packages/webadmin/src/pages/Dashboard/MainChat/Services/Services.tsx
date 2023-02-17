import React from 'react';
import { ServicesHeader } from './ServicesHeader';
import { ServicesBody } from './ServicesBody';
import s from './Services.module.sass';

export const Services = () => {
    return (
        <div className={s.container}>
            <ServicesHeader />
            <ServicesBody />
        </div>
    );
};
