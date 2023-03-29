import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useWebSocketMessage } from 'hooks';
import * as ICONS from 'assets/icons';
import s from './Chat.module.sass';

type tFormInputs = {
    message: string;
}

export const ChatInput = () => {
    const { sendWsMessage } = useWebSocketMessage();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    const onSubmit = async (data: tFormInputs) => {
        // ✅ вызываем API '/websocket', добавляем 'message'
        const result = await sendWsMessage(data.message);
        if (result === 'OK') resetField('message');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <input
                    { ...register("message") }
                    placeholder="New message..."
                />
            </div>
            <div className={s.FormButtons}>
                <button className={s.Button} type="submit">
                    <ICONS.SendIcon />
                </button>
            </div>
        </form>
    );
};
