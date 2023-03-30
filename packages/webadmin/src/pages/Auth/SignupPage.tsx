import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Icons } from '@tebox/assets';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { resetMessage, setMessage, selectUI } from "store/slices/ui";
import { useAddUserMutation } from "store/api/usersApi";
import { tFormInputs, tWarning, InputType } from './Types';
import * as yup from "yup";
import s from './Auth.module.sass';

const schema = yup.object({
    password: yup.string().min(5).max(20).required(),
    email: yup.string().email().required(),
    name: yup.string().max(20).required(),
}).required();

export const SignupPage = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ addUser ] = useAddUserMutation();
    const { watch, register, handleSubmit } = useForm<tFormInputs>();
    const [ type, setType ] = useState<InputType>(InputType.pw);

    useEffect(() => {
        const subscription = watch(() => {
            if (ui.message) {
                dispatch(resetMessage());
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, ui.message, dispatch]);

    const onSubmit = (data: tFormInputs) => {
        schema
            .validate(data)             // проверяем введенные данные
            .then(data => {
                addUser(data);          // здесь вызываем API запросы к базе на регистрацию
            })
            .catch((err: tWarning) => {
                const message = err.message || '';
                dispatch(setMessage(message));
            });
    };

    const switchPassVisibility = () => { // показать/скрыть пароль
        type === InputType.pw
            ? setType(InputType.txt)
            : setType(InputType.pw);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.authForm}
                data-testid="signup-form"
            >
                <div className={s.header}>
                    <p>Signup</p>
                </div>

                <div className={s.body}>
                    <fieldset>
                        <label>Login Name</label>
                        <input
                            {...register("name")}
                            placeholder="John Smith"
                            data-testid="name-input"
                        />
                    </fieldset>
                    <fieldset>
                        <label>Email</label>
                        <input
                            {...register("email")}
                            placeholder="mail@mail.com"
                            data-testid="email-input"
                        />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <div className={s.inputWrap}>
                            <input
                                {...register("password")}
                                placeholder="password"
                                type={type}
                                data-testid="password-input"
                            />
                            <img
                                src={ type === InputType.pw
                                        ?   Icons.SVG.EyeBlocked
                                        :   Icons.SVG.Eye
                                    }
                                alt="eye blocked"
                                onClick={switchPassVisibility}
                                data-testid="eye-switch"
                            />
                        </div>
                    </fieldset>
                </div>

                <input type="submit" className={s.AuthButton} value="Submit" data-testid="submit-input" />
            </form>
        </>
    );
};
