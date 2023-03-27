import React from 'react';
import { UserIcons } from '@tebox/assets';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectCurrentUser, setSelectedUserId } from 'store/slices/auth';
import { websocketApi } from 'store/api/websocketApi';
import s from './Chat.module.sass';
import { ChatInput } from './ChatInput';
let USERS: string[];

export const Chat = () => {
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const { data } = useGetMessagesQuery(user.id);

    console.log('Chat..data..', data);

    if (data) {
        USERS =  Object.keys(data);
    }

    const handlerClick = (client: string) => {
        dispatch(setSelectedUserId(user));

        dispatch(
            websocketApi.util.updateQueryData(
                'getMessages',
                user.id,
                (draft) => { draft[client].cnt = 0; }
            )
        );
    }

    return (
        <>
            <div className={s.ChatContainer}>
                <div className={s.ChatUsers}>
                    { !!data &&
                        USERS.map((user) => {
                            const num = data[user].msgs[0].date % 100;
                            const idx = 'user' + num;
                            const pict = UserIcons.PNG[idx];

                            return  (
                                <div key={user} className={s.UserPictWrap} onClick={() => handlerClick(user)}>
                                    <img src={pict} alt="user" className={s.UserPict} />
                                    { !!data[user].cnt &&
                                        <div className={s.UserCounter}><p>{data[user].cnt}</p></div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
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
