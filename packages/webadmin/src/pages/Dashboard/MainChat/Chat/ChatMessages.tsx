import React from 'react';
import { groupObjectsInArray } from '@tebox/utils/lib';
import { useAppSelector } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectYourId, getSelectedUserId } from 'store/slices/auth';
import { ChatBubbleGroup } from './ChatBubbleGroup';
import s from './Chat.module.sass';

export const ChatMessages = () => {
    const yourId = useAppSelector(selectYourId);
    const selectedUserId = useAppSelector(getSelectedUserId);
    const { data } = useGetMessagesQuery(yourId);

    const chat = (data && selectedUserId)
        ?   data[selectedUserId].msgs
        :   [];
    console.log('ChatMessages..', data)
    const GROUPED = groupObjectsInArray(chat, 'from');

    return (
        <div className={s.ChatMessages} role="listbox">
            { chat.length !== 0
                ?   GROUPED.map((group, idx) => (
                        <div key={idx} className={s.MsgGroup} role="listbox">
                            <ChatBubbleGroup group={group} />
                        </div>
                    ))
                :   <div className={s.ChatMessagesEmpty}>
                        <p>Select user to show messages..</p>
                    </div>
            }
        </div>
    );
};
