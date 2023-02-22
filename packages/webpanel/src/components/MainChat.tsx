import React from 'react';
import { useChatContext } from 'store';
import { iChat, iMessage } from  'types/types.context';
import { ChatBubble } from './ChatBubble';
import s from 'styles/MainChat.module.sass';

export const MainChat = () => {
    const { userId, managerId, chat } = useChatContext();

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
                GROUPED.map((group) => (
                    <div key={Date.now()} className={s.MsgGroup} role="listbox">
                        {
                            group.map((msg) => (
                                <ChatBubble msg={msg} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};
