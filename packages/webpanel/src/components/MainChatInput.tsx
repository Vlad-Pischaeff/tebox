// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMessageObject } from 'hooks/useMessageObject';
import { ButtonSendMessage } from './ButtonSendMessage';
import { iMSG } from 'types/types.context';
import s from 'styles/MainChatInput.module.sass';

type tFormInputs = {
    message: string;
}

export const MainChatInput = () => {
    const { MSG } = useMessageObject();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    const onSubmit = async (formData: tFormInputs) => {
        const { message } = formData;
        if (message) {
            MSG.sendMessage(iMSG.messageFromClient, message);
            resetField('message');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div>
                <input
                    { ...register("message") }
                    className={s.FormInput}
                    placeholder="type your message here..." />
            </div>
            <div className={s.FormButtons}>
                <ButtonSendMessage />
            </div>
        </form>
    );
};
