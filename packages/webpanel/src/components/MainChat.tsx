import React from 'react';
import { groupObjectsInArray } from '@tebox/utils/lib';
import { useChatContext } from 'store';
import { ChatBubbleGroup } from './ChatBubbleGroup';
import s from 'styles/MainChat.module.sass';

export const MainChat = () => {
    const { chat } = useChatContext();

    const GROUPED = groupObjectsInArray(chat, 'from');

    // console.log('✅ grouped..', GROUPED);
    // console.log('🍀 chat..', chat);

    return (
        <div className={s.MainContainer} role="listbox" >
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
