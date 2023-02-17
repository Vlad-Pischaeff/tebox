import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { resetMessage, setMessage, selectUI } from "store/slices/ui";
import { useResetUserPasswordMutation } from 'store/api/usersApi';
import { tFormInputs, tWarning } from './Types';
import * as yup from "yup";
import s from './Auth.module.sass';

const schema = yup.object({
    email: yup.string().email().required(),
}).required();

type FormInput = Pick<tFormInputs, 'email'>;

export const RestorePage = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ resetPassword ] = useResetUserPasswordMutation();
    const { watch, register, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        const subscription = watch(() => {
            if (ui.message) {
                dispatch(resetMessage());
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, ui.message, dispatch]);

    const onSubmit = (data: FormInput) => {
        schema
            .validate(data)                 // проверяем введенные данные
            .then(data => {
                resetPassword(data);        // вызываем API '/users/reset' для авторизации
            })
            .catch((err: tWarning) => {
                const message = err.message || '';
                dispatch(setMessage(message));
            });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.authForm}
                data-testid="restore-form"
            >
                <div className={s.header}>
                    <p>Restore</p>
                </div>

                <div className={s.body}>
                    <fieldset>
                        <label>Email</label>
                        <input
                            { ...register("email") }
                            placeholder="mail@mail.com"
                            data-testid="email-input"
                        />
                    </fieldset>
                </div>

                <input type="submit" className={s.AuthButton} value="Send" data-testid="submit-input"/>
                <div className={s.footer}>
                    <div>
                        <p>
                            <strong>type Your email</strong>
                        </p>
                        <p>
                            You are not alone. We’ve all been here at some point
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
};
