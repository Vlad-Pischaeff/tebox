import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectYourId, getSelectedUserId } from 'store/slices/auth';
import { iMessage } from 'store/api/apiTypes';
import { ChatBubbleGroup } from './ChatBubbleGroup';
import s from './Chat.module.sass';

export const ChatMessages = () => {
    const yourId = useAppSelector(selectYourId);
    const selectedUserId = useAppSelector(getSelectedUserId);
    const { data } = useGetMessagesQuery(yourId);

    const chat = (data && selectedUserId)
        ?   data[selectedUserId].msgs
        :   [];

    const GROUPED = chat.reduce((r: iMessage[][], o: iMessage, i: number, a: iMessage[]) => {
        if (a[i].from === (a[i - 1] && a[i - 1].from)) {
            r[r.length - 1].push(o);
        } else {
            r.push([o]);
        }
        return r;
    }, []);

    return (
        <div className={s.ChatMessages} role="listbox">
            { data
                ?   GROUPED.map((group, idx) => (
                        <div key={idx} className={s.MsgGroup} role="listbox">
                            <ChatBubbleGroup group={group} />
                        </div>
                    ))
                :   <p>Right workspace...</p>
            }
        </div>
    );
};
