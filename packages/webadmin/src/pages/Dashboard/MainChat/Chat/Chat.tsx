import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectCurrentUser } from 'store/slices/auth';

export const Chat = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetMessagesQuery(user.id);

    console.log('Chat..data..', data);

    return (
        <>
            { data && data.length !== 0
                ?   <div>
                        { data.map((message) => {
                            return <div key={message.date}>
                                <div>{message.from}</div>
                                <div>{message.message}</div>
                                <div>{new Date(message.date).toISOString()}</div>
                            </div>
                        })
                        }
                    </div>
                :   <p>Right workspace...</p>
            }
        </>
    );
};
