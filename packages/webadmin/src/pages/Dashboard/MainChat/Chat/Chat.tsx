import React from 'react';
// import { UserIcons } from '@tebox/assets';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectCurrentUser, setSelectedUserId, getSelectedUserId } from 'store/slices/auth';
// import { websocketApi } from 'store/api/websocketApi';
import s from './Chat.module.sass';
import { ChatClients } from './ChatClients';
import { ChatInput } from './ChatInput';
// let USERS: string[];

export const Chat = () => {
    // const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    // const selectedUserId = useAppSelector(getSelectedUserId);
    const { data } = useGetMessagesQuery(user.id);

    // console.log('Chat..data..', data);

    // if (data) {
    //     USERS =  Object.keys(data);
    // }

    // const handlerClick = (client: string) => {
    //     dispatch(setSelectedUserId(client));

    //     dispatch(
    //         websocketApi.util.updateQueryData(
    //             'getMessages',
    //             user.id,
    //             (draft) => { draft[client].cnt = 0; }
    //         )
    //     );
    // }

    return (
        <>
            <div className={s.ChatContainer}>
                <ChatClients />
                <div className={s.ChatMessages}>
                    { data
                        ?   <div className={s.Chat}>
                                {/* { data.map((message) => {
                                    return <div key={message.date}>
                                        <div>{message.from}</div>
                                        <div>{message.message}</div>
                                        <div>{new Date(message.date).toLocaleString()}</div>
                                    </div>
                                })
                                } */}
                            </div>
                        :   <p>Right workspace...</p>
                    }
                </div>
            </div>
            <ChatInput />
        </>

    );
};
