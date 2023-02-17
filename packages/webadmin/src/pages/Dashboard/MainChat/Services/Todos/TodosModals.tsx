import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIState, eModal } from 'store/slices/ui';
import { TodosAddForm } from './TodosAddForm';

type eTodosModals = Extract<eModal, eModal.todo>;

const MODAL_FORMS = {
    [eModal.todo]:   <TodosAddForm />,

}

export const TodosModals = () => {
    const modal = useAppSelector(selectUIState('servicesModal'));

    return (
        <>
            { MODAL_FORMS[modal as eTodosModals] }
        </>
    );
};
