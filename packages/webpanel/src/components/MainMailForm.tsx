// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useChatContext } from 'store';
import { ButtonSendMessage } from './ButtonSendMessage';
import { iMSG } from 'types/types.context';
import s from 'styles/MainMailForm.module.sass';

type tFormInputs = {
    mailFrom: string,
    message: string
}

export const MainMailForm = () => {
    const { MSG } = useChatContext();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    });

    const onSubmit = (formData: tFormInputs) => {
        const { message, mailFrom } = formData;
        const data = JSON.stringify({ message, mailFrom });

        if (message && mailFrom) {
            MSG.sendMessage(iMSG.mailFromClient, data);
            resetField('message');
            resetField('mailFrom');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormMessage}>
                <textarea
                    { ...register("message") }
                    className={s.FormInput}
                    placeholder="type your message here..." />
            </div>
            <div className={s.FormButtons}>
                <input
                    { ...register("mailFrom") }
                    className={s.FormInput}
                    placeholder="your email address..." />
                <ButtonSendMessage />
            </div>
        </form>
    );
};
