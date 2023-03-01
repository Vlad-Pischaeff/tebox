// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useChatContext } from 'store';
import { ButtonSendMessage } from './ButtonSendMessage';
import { iWS} from 'types/types.websocket';
import s from 'styles/MainChatInput.module.sass';

type tFormInputs = {
    message: string;
}

export const MainChatInput = () => {
    const { WS } = useChatContext();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    const onSubmit = async (formData: tFormInputs) => {
        if (formData.message) {
            WS.sendMessage(formData.message, iWS.messageFromClient);
            clearInput();
        }
    };

    const clearInput = () => {
        resetField('message');
    }

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
