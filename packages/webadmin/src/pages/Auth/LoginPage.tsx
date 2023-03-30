import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Icons } from '@tebox/assets';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { resetMessage, setMessage, selectUI } from "store/slices/ui";
import { useLoginUserMutation } from 'store/api/usersApi';
import { tFormInputs, tWarning, InputType } from './Types';
import * as yup from "yup";
import s from './Auth.module.sass';

const schema = yup.object({
    password: yup.string().min(5).max(20).required(),
    name: yup.string().max(20).required(),
}).required();

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ loginUser ] = useLoginUserMutation();
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
            .validate(data)                 // проверяем введенные данные
            .then(data => {
                loginUser(data);            // вызываем API '/users/login' для авторизации
            })
            .catch((err: tWarning) => {
                const message = err.message || '';
                dispatch(setMessage(message));
            });
    };

    const switchPassVisibility = () => {
        type === InputType.pw
            ? setType(InputType.txt)
            : setType(InputType.pw);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.authForm}
                data-testid="login-form"
            >
                <div className={s.header}>
                    <p>Login</p>
                </div>

                <div className={s.body}>
                    <fieldset>
                        <label>Login Name</label>
                        <input
                            { ...register("name") }
                            placeholder="John Smith"
                            data-testid="login-input"
                        />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <div className={s.inputWrap}>
                            <input
                                { ...register("password") }
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

                <input type="submit" className={s.AuthButton} value="Login" data-testid="submit-input" />
                <div className={s.footer}>
                    <Link to={'/restore'}>Forgot password?</Link>
                </div>
            </form>
        </>
    );
};
