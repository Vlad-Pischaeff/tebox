import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { setServicesModal, setEmoji, selectUIState, eModal } from 'store/slices/ui';
import { useWebSocketMessage } from 'hooks';
import * as ICONS from 'assets/icons';
import s from './Chat.module.sass';

type tFormInputs = {
    message: string;
}

export const ChatInput = () => {
    const dispatch = useAppDispatch();
    const emoji = useAppSelector(selectUIState('emoji'));
    const { sendWsMessage } = useWebSocketMessage();
    const { setFocus, setValue, getValues, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    useEffect(() => {
        let message = getValues('message') || '';
        message = message + '' + emoji;
        setValue('message', message);
        // eslint-disable-next-line
    }, [emoji]);

    const onSubmit = async (data: tFormInputs) => {
        // ✅ вызываем API '/websocket', добавляем 'message'
        const result = await sendWsMessage(data.message);
        if (result === 'OK') {
            resetField('message');
            dispatch(setEmoji(''));
        }
    }

    const openModalPickEmoji = () => {
        dispatch(setServicesModal(eModal.pickEmoji));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div>
                <div className={s.Button} onClick={openModalPickEmoji}>
                    <ICONS.EmojiIcon />
                </div>
            </div>
            <div className={s.FormBody}>
                <input
                    { ...register("message") }
                    placeholder="New message..."
                />
            </div>
            <div>
                <button className={s.Button} type="submit">
                    <ICONS.SendIcon />
                </button>
            </div>
        </form>
    );
};
