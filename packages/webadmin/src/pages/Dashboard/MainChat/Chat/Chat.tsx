import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetMessagesQuery, useSendMessageMutation } from 'store/api/websocketApi';
import { selectCurrentUser } from 'store/slices/auth';

export const Chat = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetMessagesQuery(user.id);

    console.log('Chat..data..', data, useSendMessageMutation());

    return (
        <>
            { data && data.length !== 0
                ?   <div>
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
        </>
    );
};
