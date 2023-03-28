import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { useSendMessageMutation, websocketApi } from 'store/api/websocketApi';
import * as ICONS from 'assets/icons';
import s from './Chat.module.sass';

type tFormInputs = {
    message: string;
}

export const ChatInput = () => {
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const [ sendMessage ] = useSendMessageMutation();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    const onSubmit = async (data: tFormInputs) => {
        // ✅ вызываем API '/websocket', добавляем 'message'
        // обновляем кэш сообщений
        if (data.message) {
            const message = {
                'MSG_FROM_MANAGER': {
                    'from': user.id,
                    'to': 'server',
                    'message': data.message,
                    'date': Date.now()
                }
            };
            await sendMessage(JSON.stringify(message));

            const idx = message['MSG_FROM_MANAGER'].to;

            dispatch(
                websocketApi.util.updateQueryData(
                    'getMessages',
                    user.id,
                    (draft) => {
                        draft[idx].msgs.push(message['MSG_FROM_MANAGER']);
                    }
                )
            );
            resetField('message');
        }
    };

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
