import React from 'react';
import { useChatContext } from 'store';
import { iChat, iMessage } from  'types/types.context';
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

    const indexOfAll = (arr: iChat, val: string) => {
        return arr.reduce((acc: number[], el: iMessage, i: number) => (
                el.from === val ? [...acc, i] : acc
            ), []
        );
    }

    return (
        <div className={s.MainContainer} role="listbox">
            {
                GROUPED.map((group) => (
                    <div key={Date.now()} className={s.MsgGroup} role="listbox">
                        {
                            group.map((msg) => (
                                <div
                                    className={`
                                        ${s.MsgContainer}
                                        ${msg.from === userId ? s.left : s.right}
                                    `}
                                    key={Date.now()}
                                    role="listitem"
                                >
                                    <div>from {msg.from}</div>
                                    <div>to {msg.to}</div>
                                    <div>{msg.message}</div>
                                    <div>{msg.date.toISOString()}</div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};
