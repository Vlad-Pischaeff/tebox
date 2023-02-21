import React from 'react';
import { useChatContext } from 'store';
import { iChat, iMessage } from  'types/types.context';
import s from 'styles/MainChat.module.sass';

export const MainChat = () => {
    const { userId, managerId, chat } = useChatContext();

    console.log('✅ id => ', userId, managerId);

    // type iArr = {
    //     from: number,
    //     to: number
    // }

    const indexOfAll = (arr: iChat, val: string) => {
        return arr.reduce((acc: number[], el: iMessage, i: number) => (
                el.from === val ? [...acc, i] : acc
            ), []
        );
    }

    const arrangeMessages = (arr: iChat) => {
        console.log('✅ idx...',indexOfAll(arr, userId));
        return <div></div>
    }

    return (
        <div className={s.MainContainer}>
            <div>
                {arrangeMessages(chat)}
            </div>

            {
                chat.map((msg) => (
                    <div className={`${s.MessageContainer} ${msg.from === managerId ? s.right : s.left}`} key={msg.date.toISOString()}>
                        <div>from {msg.from}</div>
                        <div>to {msg.to}</div>
                        <div>{msg.message}</div>
                        <div>{msg.date.toISOString()}</div>
                    </div>
                ))
            }
        </div>
    );
};
