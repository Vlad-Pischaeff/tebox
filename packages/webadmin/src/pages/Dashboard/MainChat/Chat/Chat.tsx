import React from 'react';
import { ChatClients } from './ChatClients';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { ChatModals } from './ChatModals';
import s from './Chat.module.sass';

export const Chat = () => {

    return (
        <>
            <div className={s.ChatContainer}>
                <ChatModals />

                <ChatMessages />
                <ChatClients />

            </div>

            <ChatInput />
        </>

    );
};
