import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIState, setServicesModal, setEditedNote, eModal } from 'store/slices/ui';
import { useAddNoteMutation, useEditNoteMutation } from 'store/api/notesApi';
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';

type tFormInputs = {
    title: string;
    description: string;
}

export const Form = () => {
    const dispatch = useAppDispatch();
    const editedNote = useAppSelector(selectUIState('editedNote'));
    const [ addNote ] = useAddNoteMutation();
    const [ updateNote ] = useEditNoteMutation();
    const { setFocus, register, setValue, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('title', { shouldSelect: false });
    }, [setFocus]);

    useEffect(() => {
        // ✅ invoke when editing note
        if (editedNote) {
            setValue('title', editedNote.title);
            setValue('description', editedNote.description);
        }
    }, [editedNote, setValue]);

    const onSubmit = (data: tFormInputs) => {
        if (editedNote) {
            // ✅ вызываем API '/notes', обновляем 'note'
            const updatedData = { id: editedNote.id, ...data };
            updateNote(updatedData);
        } else {
            // ✅ вызываем API '/notes', добавляем 'note'
            addNote(data);
        }
        closeModal();
    };

    const closeModal = () => {
        resetField('title');
        resetField('description');
        dispatch(setEditedNote(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>Title</label>
                    <input
                        { ...register("title") }
                        className={s.FormInput}
                        placeholder="New note title..." />
                </fieldset>
                <fieldset>
                    <label>Description</label>
                    <div className={s.FormTextArea}>
                        <textarea
                            { ...register("description") }
                            placeholder="New note description..."
                            rows={3} />
                    </div>
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value={editedNote ? "Update note" : "Add note"} />
            </div>
        </form>
    );
};

export const NotesAddForm = withModalBG(Form);
