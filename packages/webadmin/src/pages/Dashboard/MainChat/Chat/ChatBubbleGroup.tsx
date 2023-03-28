import React from 'react';
import { useAppSelector } from 'store/hook';
import { getSelectedUserId } from 'store/slices/auth';
import { ChatBubble } from './ChatBubble';
import { iMessage } from  'store/api/apiTypes';
import s from './ChatMessages.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement>{
    group: iMessage[]
}

export const ChatBubbleGroup = ({ group }: iProps) => {
    const selectedUserId = useAppSelector(getSelectedUserId);

    return (
        <>
            {
                group.map((msg, i) => (
                    <div
                        key={i}
                        className={`${msg.from === selectedUserId ? s.left : s.right}`}
                        role="listitem"
                    >
                        <ChatBubble msg={msg} />
                    </div>
                ))
            }
        </>
    );
};
