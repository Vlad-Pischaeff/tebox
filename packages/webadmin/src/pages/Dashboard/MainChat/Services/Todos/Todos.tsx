import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { TodosMain } from './TodosMain';
import { TodosModals } from './TodosModals';
import s from '../Services.module.sass';


export const Todos = () => {
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setServicesModal(eModal.todo));
    }

    return (
        <>
            <input
                type="button"
                className={s.AddItem}
                value="+ add todo"
                onClick={openModal} />

            <TodosModals />

            <TodosMain />
        </>
    );
};
