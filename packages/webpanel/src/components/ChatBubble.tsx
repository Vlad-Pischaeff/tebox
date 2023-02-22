import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { iMessage } from  'types/types.context';
import s from 'styles/MainChat.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement>{
    msg: iMessage
}

export const ChatBubble = ({ msg }: iProps) => {

    return (
        <div className={s.MsgContainer}>
            <div className={s.date}>
                {
                    formatDistanceToNow(
                        msg.date,
                        { addSuffix: true, includeSeconds: true }
                    )
                }
            </div>

            <div className={s.msg}>{msg.message}</div>
        </div>
    );
};
