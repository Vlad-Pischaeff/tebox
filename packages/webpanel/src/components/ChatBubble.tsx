import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useChatContext } from 'store';
import { iMessage } from  'types/types.context';
import s from 'styles/MainChat.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement>{
    msg: iMessage
}

export const ChatBubble = ({ msg }: iProps) => {
    const { userId } = useChatContext();

    return (
        <div
            className={`
                ${s.MsgContainer}
                ${msg.from === userId ? s.right : s.left}
            `}
            key={Date.now()}
            role="listitem"
        >
            <div className={s.date}>{formatDistanceToNow(msg.date, {addSuffix: true, includeSeconds: true})}</div>
            {/* <div className={s.msg}>from {msg.from}</div>
            <div className={s.msg}>to {msg.to}</div> */}
            <div className={s.msg}>{msg.message}</div>
        </div>
    );
};
