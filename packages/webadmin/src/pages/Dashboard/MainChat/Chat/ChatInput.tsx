import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EmojiStyle } from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from 'store/hook';
import { getSelectedUserId } from 'store/slices/auth';
import { setServicesModal, setEmoji, selectUIState, eModal } from 'store/slices/ui';
import { useWebSocketMessage } from 'hooks';
import * as ICONS from 'assets/icons';
import s from './Chat.module.sass';

type tFormInputs = {
    message: string;
}

interface iEmojiObject {
    [x: string]: string
}

export const ChatInput = () => {
    const dispatch = useAppDispatch();
    const selecterUserId = useAppSelector(getSelectedUserId);
    const emojiData = useAppSelector(selectUIState('emoji'));
    const [ emojiObj, setEmojiObj ] = useState<iEmojiObject>({});
    const { sendWsMessage } = useWebSocketMessage();
    const { setFocus, setValue, getValues, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    useEffect(() => {
        if (emojiData) {
            const key = emojiData.emoji.codePointAt(0);

            if (key) {
                const emoji = {
                    ...emojiObj,
                    [key]: `<img class="emj" src="${emojiData.getImageUrl(EmojiStyle.NATIVE)}" alt="${emojiData.names[0]}" />`
                };

                setEmojiObj(emoji);
                let message = getValues('message') || '';
                message = message + String.fromCodePoint(key);  // 😄 = '&#128516;'
                setValue('message', message);
            }
        }
        // eslint-disable-next-line
    }, [emojiData]);

    const onSubmit = async (data: tFormInputs) => {
        // ✅ вызываем API '/websocket', добавляем 'message'
        if (selecterUserId && data.message.length !== 0) {
            const message = replaceEmojisByImages(data.message);

            const result = await sendWsMessage(message);

            if (result === 'OK') {
                resetField('message');
                dispatch(setEmoji(null));
                setEmojiObj({});            // м.б. этого и не надо делать
            }
        }
    }

    const replaceEmojisByImages = (message: string) => {
        let msg = message;

        if (Object.keys(emojiObj).length !== 0) {

            [ ...msg ].forEach((char) => {

                const key = char.codePointAt(0);

                if (key && emojiObj[key]) {
                    msg = msg.replace(char, emojiObj[key]);
                }
            })

        }
        return msg;
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
