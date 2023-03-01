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
    const { WS, updateChat } = useChatContext();
    const { setFocus, setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    useEffect(() => {
        // ✅ invoke when editing site
        // if (editedSite && 'site' in editedSite) {
        //     setValue('siteName', editedSite.site);
        // }
    }, [setValue]);

    const onSubmit = async (formData: tFormInputs) => {
        if (formData.message) {
            const message = WS.prepareMessage(
                iWS.messageFromClient, 
                formData.message
            );
            WS.sendMessage(message);
            updateChat(message[iWS.messageFromClient]);
            console.log('✅ Submit...', message, Object.keys(message))
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
