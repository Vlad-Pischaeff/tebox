import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIState, setServicesModal, setEditedAnswer, eModal } from 'store/slices/ui';
import { useAddAnswerMutation, useEditAnswerMutation } from 'store/api/answersApi';
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';

type tFormInputs = {
    description: string;
}

const Form = () => {
    const dispatch = useAppDispatch();
    const editedAnswer = useAppSelector(selectUIState('editedAnswer'));
    const [ addAnswer ] = useAddAnswerMutation();
    const [ updateAnswer ] = useEditAnswerMutation();
    const { setFocus, setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('description', { shouldSelect: false });
    }, [setFocus]);

    useEffect(() => {
        // ✅ invoke when editing note
        !!editedAnswer && setValue('description', editedAnswer.description);
    }, [editedAnswer, setValue]);

    const onSubmit = (data: tFormInputs) => {
        if (editedAnswer) {
            // ✅ вызываем API '/answers', обновляем 'answers'
            const updatedData = { id: editedAnswer.id, ...data };
            updateAnswer(updatedData);
        } else {
            // ✅ вызываем API '/answers', добавляем 'answers'
            addAnswer(data);
        }
        closeModal();
    };

    const closeModal = () => {
        resetField('description');
        dispatch(setEditedAnswer(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>Description</label>
                    <div className={s.FormTextArea}>
                        <textarea
                            { ...register("description") }
                            placeholder="My new answer..."
                            rows={5} />
                    </div>
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value={editedAnswer ? "Update answer" : "Add answer"} />
            </div>
        </form>
    );
};

export const AnswersAddForm = withModalBG(Form);
