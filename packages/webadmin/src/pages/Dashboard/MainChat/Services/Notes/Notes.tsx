import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { NotesModals } from './NotesModals';
import { NotesMainList } from './NotesMainList';
import { NotesMainListFooter } from './NotesMainListFooter';
import s from '../Services.module.sass';

export const Notes = () => {
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setServicesModal(eModal.note));
    }

    return (
        <>
            <input
                type="button"
                className={s.AddItem}
                value="+ add note"
                onClick={openModal} />

            <NotesModals />

            <NotesMainList />

            <NotesMainListFooter />
        </>
    );
};
