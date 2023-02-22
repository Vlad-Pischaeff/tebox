import React from 'react';
import { useChatContext } from 'store';
import { iMessage } from  'types/types.context';
import { ChatBubble } from './ChatBubble';
import s from 'styles/MainChat.module.sass';

export const MainChat = () => {
    const { chat, userId } = useChatContext();

    const GROUPED = chat.reduce((r: iMessage[][], o: iMessage, i: number, a: iMessage[]) => {
        if (a[i].from === (a[i - 1] && a[i - 1].from)) {
            r[r.length - 1].push(o);
        } else {
            r.push([o]);
        }
        return r;
    }, []);

    console.log('✅ grouped..', GROUPED);

    return (
        <div className={s.MainContainer} role="listbox">
            {
                GROUPED.map((group, idx) => (
                    <div key={idx} className={s.MsgGroup} role="listbox">
                        {
                            group.map((msg, i) => (
                                <div
                                    className={`
                                        ${msg.from === userId ? s.right : s.left}
                                    `}
                                    key={i}
                                    role="listitem"
                                >
                                    <ChatBubble msg={msg} />
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};
