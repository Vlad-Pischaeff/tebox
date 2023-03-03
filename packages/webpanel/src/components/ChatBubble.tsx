import React, { useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { iMessage } from  'types/types.context';
import s from 'styles/MainChat.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement>{
    msg: iMessage
}

export const ChatBubble = ({ msg }: iProps) => {
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth'});
    }, []);

    return (
        <div className={s.MsgContainer} ref={chatRef}>
            <div className={s.date}>
                {
                    formatDistanceToNow(
                        new Date(msg.date),
                        { addSuffix: true, includeSeconds: true }
                    )
                }
            </div>

            <div className={s.msg}>{msg.message}</div>
        </div>
    );
};
