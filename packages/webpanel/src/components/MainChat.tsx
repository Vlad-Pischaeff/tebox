import React from 'react';
import { useChatContext } from 'store';
import { iMessage } from  'types/types.context';
import { ChatBubbleGroup } from './ChatBubbleGroup';
import s from 'styles/MainChat.module.sass';

export const MainChat = () => {
    const { chat } = useChatContext();

    const GROUPED = chat.reduce((r: iMessage[][], o: iMessage, i: number, a: iMessage[]) => {
        if (a[i].from === (a[i - 1] && a[i - 1].from)) {
            r[r.length - 1].push(o);
        } else {
            r.push([o]);
        }
        return r;
    }, []);

    // console.log('✅ grouped..', GROUPED);

    return (
        <div className={s.MainContainer} role="listbox">
            {
                GROUPED.map((group, idx) => (
                    <div key={idx} className={s.MsgGroup} role="listbox">
                        <ChatBubbleGroup group={group} />
                    </div>
                ))
            }
        </div>
    );
};
