import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
    selectUIState,
    setServicesModal,
    setEditedNote,
    setItemServiceMenu,
    eModal
} from "store/slices/ui";
import { useEditNoteMutation } from 'store/api/notesApi';
import { withModalBG } from 'components/HOC';
import * as UI from 'components/ui';
import s from 'assets/style/forms.module.sass';

const Editor = () => {
    const dispatch = useAppDispatch();
    const editedNote = useAppSelector(selectUIState('editedNote'));
    const [ updateNote ] = useEditNoteMutation();
    const [ convertedText, setConvertedText ] = useState('');

    useEffect(() => {
        // ✅ invoke when editing note's description
        if (editedNote) {
            setConvertedText(editedNote.description);
        }
        // eslint-disable-next-line
    }, [editedNote]);

    const onSubmit = () => {
        if (editedNote) {
            // ✅ вызываем API '/notes', обновляем 'note'
            const updatedData = {
                id: editedNote.id,
                description: convertedText
            };
            updateNote(updatedData);
        }
        closeModal();
    };

    const closeModal = () => {
        dispatch(setEditedNote(null));
        dispatch(setServicesModal(eModal.none));
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.FormEditor}>
            <UI.Editor
                content={convertedText}
                setContent={setConvertedText}
                onClose={closeModal}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export const NotesEditor = withModalBG(Editor);
