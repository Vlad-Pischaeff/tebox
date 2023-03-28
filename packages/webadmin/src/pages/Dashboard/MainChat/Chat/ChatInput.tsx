import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectYourId, getSelectedUserId } from 'store/slices/auth';
import { useSendMessageMutation, websocketApi } from 'store/api/websocketApi';
import * as ICONS from 'assets/icons';
import s from './Chat.module.sass';

type tFormInputs = {
    message: string;
}

export const ChatInput = () => {
    const dispatch = useAppDispatch();
    const yourId = useAppSelector(selectYourId);
    const selectedUserId = useAppSelector(getSelectedUserId);
    const [ sendMessage ] = useSendMessageMutation();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    const onSubmit = async (data: tFormInputs) => {
        // ✅ вызываем API '/websocket', добавляем 'message'
        if (data.message && selectedUserId) {
            // ✅ шлем сообщение
            const message = {
                'MSG_FROM_MANAGER': {
                    'from': yourId,
                    'to': 'server',
                    'message': data.message,
                    'date': Date.now()
                }
            };
            await sendMessage(JSON.stringify(message));

            // ✅ обновляем кэш сообщений
            const idx = message['MSG_FROM_MANAGER'].to;

            dispatch(
                websocketApi.util.updateQueryData(
                    'getMessages',
                    yourId,
                    (draft) => {
                        draft[idx].msgs.push(message['MSG_FROM_MANAGER']);
                        draft[idx].cnt = 0;
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
