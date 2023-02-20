import React from 'react';
import { useChatContext } from 'store';
import 'styles/MainChat.sass';

export const MainChat = () => {
    const { userId, managerId, chat, setChat } = useChatContext();

    console.log('✅ id => ', userId, managerId)

    return (
        <div className='Main-container'>
            {
                chat.map((msg) => (
                    <div className='Message-container' key={msg.date.toISOString()}>
                        <div>{msg.from}</div>
                        <div>{msg.to}</div>
                        <div>{msg.message}</div>
                        <div>{msg.date.toISOString()}</div>
                    </div>
                ))
            }
        </div>
    );
};
