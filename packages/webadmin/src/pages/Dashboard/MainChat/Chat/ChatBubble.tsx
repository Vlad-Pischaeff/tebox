import React, { useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { iMessage } from  'store/api/apiTypes';
import s from './Chat.module.sass';

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

            <div className={s.msg}>
                {
                    typeof msg.message === 'string' &&
                        msg.message
                }
            </div>
        </div>
    );
};
