import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectCurrentUser } from 'store/slices/auth';
import s from './Chat.module.sass';
import { ChatInput } from './ChatInput';

export const Chat = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetMessagesQuery(user.id);

    console.log('Chat..data..', data);

    return (
        <>
            <div className={s.ChatContainer}>
                { data && data.length !== 0
                    ?   <div className={s.Chat}>
                            { data.map((message) => {
                                return <div key={message.date}>
                                    <div>{message.from}</div>
                                    <div>{message.message}</div>
                                    <div>{new Date(message.date).toLocaleString()}</div>
                                </div>
                            })
                            }
                        </div>
                    :   <p>Right workspace...</p>
                }
            </div>
            <ChatInput />
        </>

    );
};
