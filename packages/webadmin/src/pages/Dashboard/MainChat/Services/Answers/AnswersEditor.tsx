import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIState, setServicesModal, setEditedAnswer, setItemServiceMenu, eModal } from 'store/slices/ui';
import { useEditAnswerMutation } from 'store/api/answersApi';
import { withModalBG } from 'components/HOC';
import * as UI from 'components/ui';
import s from 'assets/style/forms.module.sass';

const Editor = () => {
    const dispatch = useAppDispatch();
    const editedAnswer = useAppSelector(selectUIState('editedAnswer'));
    const [ updateAnswer ] = useEditAnswerMutation();
    const [ convertedText, setConvertedText ] = useState('');

    useEffect(() => {
        // ✅ invoke when editing answers
        !!editedAnswer && setConvertedText(editedAnswer.description);
        // eslint-disable-next-line
    }, [editedAnswer]);

    const onSubmit = () => {
        if (editedAnswer) {
            // ✅ вызываем API '/answers', обновляем 'answers'
            const updatedData = {
                id: editedAnswer.id,
                description: convertedText
            };
            updateAnswer(updatedData);
        }
        closeModal();
    };

    const closeModal = () => {
        dispatch(setEditedAnswer(null));
        dispatch(setServicesModal(eModal.none));
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.FormEditor}>
            <UI.Editor
                content={convertedText}
                setContent={setConvertedText}
                onClose={closeModal}
                onSubmit={onSubmit} />
        </div>
    );
};

export const AnswersEditor = withModalBG(Editor);
