// eslint-disable-next-line
import React, { useEffect, useRef } from 'react';
import { useChatContext } from 'store';
import { ButtonSendMessage } from './ButtonSendMessage';
import { iMSG } from 'types/types.context';
import s from 'styles/MainChatInput.module.sass';

export const MainChatInput = () => {
    const { MSG } = useChatContext();
    const ipRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        !!ipRef.current && ipRef.current.focus();
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ipRef.current?.value) {
            MSG.sendMessage(iMSG.messageFromClient, ipRef.current?.value);
            ipRef.current.value = '';
            ipRef.current.focus();
        }
    }

    return (
        <form className={s.Form} onSubmit={handleSubmit}>
            <div>
                <input
                    ref={ipRef}
                    className={s.FormInput}
                    placeholder="type your message here..." />
            </div>
            <div className={s.FormButtonWrap}>
                <ButtonSendMessage />
            </div>
        </form>
    );
};
