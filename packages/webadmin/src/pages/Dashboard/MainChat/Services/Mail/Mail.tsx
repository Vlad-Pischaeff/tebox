import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'store/hook';
import { selectUI } from 'store/slices/ui';
import { useAddTodoMutation } from 'store/api/todosApi';
import s from '../Services.module.sass';

type tFormInputs = {
    description: string;
};

export const Mail = () => {
    // eslint-disable-next-line
    const ui = useAppSelector(selectUI);
    const [ addTodo ] = useAddTodoMutation();
    // eslint-disable-next-line
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    // eslint-disable-next-line
    const onSubmit = (data: tFormInputs) => {
        // вызываем API '/todos', добавляем 'todo'
        addTodo(data);
        resetField('description');
    };

    const openModal = () => {
        // TODO add logic
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ write mail" onClick={openModal} />

            {/* <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.FormBody}>
                    <fieldset>
                        <label>Description</label>
                        <input { ...register("description") } placeholder="My mail..." />
                    </fieldset>
                </div>

                <input type="submit" value="Add mail" />
            </form> */}

            <div className={s.Main}>
                <div className={s.MainPlaceholder}>
                    <p>No mails...</p>
                </div>
            </div>

            <div className={s.Footer}>
                Mail service footer
            </div>
        </>
    );
};
