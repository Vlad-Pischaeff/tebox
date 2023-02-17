import React from 'react';
import { selectUIState } from 'store/slices/ui';
import { useAppSelector } from 'store/hook';
import { Snack } from './Snack';

export const SnackBar = () => {
    const message = useAppSelector(selectUIState('message'));

    return message
        ?   <Snack message={message} />
        :   null;
};
