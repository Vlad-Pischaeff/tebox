import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { useAddTodoMutation } from 'store/api/todosApi';
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';

type tFormInputs = {
    description: string;
}

const Form = () => {
    const dispatch = useAppDispatch();
    const [ addTodo ] = useAddTodoMutation();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('description', { shouldSelect: false });
    }, [setFocus]);

    const onSubmit = (data: tFormInputs) => {
        // ✅ вызываем API '/todos', добавляем 'todo'
        addTodo(data);
        if (data.description) closeModal();
    };

    const closeModal = () => {
        resetField('description');
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
                            placeholder="My new todo..."
                            rows={3} />
                    </div>
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Add todo" />
            </div>
        </form>
    );
};

export const TodosAddForm = withModalBG(Form);
