// eslint-disable-next-line
import React, { useEffect, useRef } from 'react';
import { useChatContext } from 'store';
import { ButtonSendMessage } from './ButtonSendMessage';
import { iMSG } from 'types/types.context';
import s from 'styles/MainMailForm.module.sass';

export const MainMailForm = () => {
    const { MSG } = useChatContext();
    const ipRef = useRef<HTMLInputElement>(null);
    const taRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        !!taRef.current && taRef.current.focus();
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = taRef.current?.value;
        const mailFrom = ipRef.current?.value;
        const data = JSON.stringify({ message, mailFrom });

        if (message && mailFrom) {
            MSG.sendMessage(iMSG.mailFromClient, data);
            taRef.current.value = '';
            ipRef.current.value = '';
            taRef.current.focus();
        }
    }

    return (
        <form className={s.Form} onSubmit={handleSubmit}>
            <div className={s.FormMessage}>
                <textarea
                    ref={taRef}
                    className={s.FormInput}
                    placeholder="type your message here..." />
            </div>
            <div className={s.FormButtons}>
                <input
                    ref={ipRef}
                    className={s.FormInput}
                    placeholder="your email address..." />
                <div className={s.FormButtonWrap}>
                    <ButtonSendMessage />
                </div>
            </div>
        </form>
    );
};
