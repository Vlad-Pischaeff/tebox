import React from 'react';
import config from '@tebox/config/client';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectYourId, setSelectedUserId, getSelectedUserId } from 'store/slices/auth';
import { useWebSocketMessage } from 'hooks';
import s from './Chat.module.sass';

let USERS: string[];

export const ChatClients = () => {
    const dispatch = useAppDispatch();
    const yourId = useAppSelector(selectYourId);
    const selectedUserId = useAppSelector(getSelectedUserId);
    const { resetNewMessagesCounter } = useWebSocketMessage();
    const { data } = useGetMessagesQuery(yourId);

    if (data) {
        USERS =  Object.keys(data);
    }

    const handlerClick = (client: string) => {
        dispatch(setSelectedUserId(client));
        resetNewMessagesCounter(client);
    }

    return (
        <div className={s.ChatUsers} role="listbox">
            { !!data &&
                USERS.map((user) => {
                    const num = data[user].msgs[0].date % 100;
                    const idx = 'user' + num;
                    const addr = `${config.SERVER_URL}/images/png/${idx}.png`;

                    return  (
                        <div
                            key={user}
                            onClick={() => handlerClick(user)}
                            className={`${s.UserPictWrap} ${user === selectedUserId ? s.focus : ''}`}
                            role="listitem"
                        >
                            <img src={addr} alt="user" className={s.UserPict} />

                            {/* new messages counter */}
                            { !!data[user].cnt &&
                                <div className={s.UserCounter}>
                                    <p>
                                        {data[user].cnt}
                                    </p>
                                </div>
                            }

                        </div>
                    )
                })
            }
        </div>
    );
};
