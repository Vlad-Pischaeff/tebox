import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { useSendMessageMutation, websocketApi } from 'store/api/websocketApi';
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
            dispatch(
                websocketApi.util.updateQueryData(
                    'getMessages',
                    user.id,
                    (draftPosts) => {
                        draftPosts.push(message['MSG_FROM_MANAGER']);
                    }
                )
            );
            resetField('message');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <div className={s.FormInput}>
                        <input
                            { ...register("message") }
                            placeholder="New message..."
                        />
                    </div>
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="submit" value="Send" />
            </div>
        </form>
    );
};
