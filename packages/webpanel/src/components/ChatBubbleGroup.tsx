import React from 'react';
import { useChatContext } from 'store';
import { ChatBubble } from './ChatBubble';
import { iMessage } from  'types/types.context';
import s from 'styles/MainChat.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement>{
    group: iMessage[]
}

export const ChatBubbleGroup = ({ group }: iProps) => {
    const { userId } = useChatContext();

    return (
        <>
            {
                group.map((msg, i) => (
                    <div
                        key={i}
                        className={`${msg.from === userId ? s.right : s.left}`}
                        role="listitem"
                    >
                        <ChatBubble msg={msg} />
                    </div>
                ))
            }
        </>
    );
};
