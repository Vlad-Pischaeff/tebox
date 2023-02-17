import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { AnswersModals } from './AnswersModals';
import { AnswersMainList } from './AnswersMainList';
import { AnswersMainListFooter } from './AnswersMainListFooter';
import s from '../Services.module.sass';

export const Answers = () => {
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setServicesModal(eModal.answer));
    }

    return (
        <>
            <input
                type="button"
                className={s.AddItem}
                value="+ add answer"
                onClick={openModal} />

            <AnswersModals />

            <AnswersMainList />

            <AnswersMainListFooter />
        </>
    );
};
