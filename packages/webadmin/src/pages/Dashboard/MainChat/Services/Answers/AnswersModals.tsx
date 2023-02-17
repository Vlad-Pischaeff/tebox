import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIState, eModal } from 'store/slices/ui';
import { AnswersAddForm } from './AnswersAddForm';
import { AnswersEditor } from './AnswersEditor';

type eProfileModals = Extract<eModal, eModal.answer | eModal.editor >;

const MODAL_FORMS = {
    [eModal.answer]: <AnswersAddForm />,
    [eModal.editor]: <AnswersEditor />
}

export const AnswersModals = () => {
    const modal = useAppSelector(selectUIState('servicesModal'));

    return (
        <>
            { MODAL_FORMS[modal as eProfileModals] }
        </>
    );
};
