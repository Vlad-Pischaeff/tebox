import React from 'react';
import { UserIcons } from '@tebox/assets';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetMessagesQuery } from 'store/api/websocketApi';
import { selectCurrentUser, setSelectedUserId, getSelectedUserId } from 'store/slices/auth';
import { websocketApi } from 'store/api/websocketApi';
import s from './Chat.module.sass';
let USERS: string[];

export const ChatClients = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const selectedUserId = useAppSelector(getSelectedUserId);
    const { data } = useGetMessagesQuery(user.id);

    // console.log('ChatClients..data..', data);

    if (data) {
        USERS =  Object.keys(data);
    }

    const handlerClick = (client: string) => {
        dispatch(setSelectedUserId(client));

        dispatch(
            websocketApi.util.updateQueryData(
                'getMessages',
                user.id,
                (draft) => { draft[client].cnt = 0; }
            )
        );
    }

    return (
        <div className={s.ChatUsers} role="listbox">
            { !!data &&
                USERS.map((user) => {
                    const num = data[user].msgs[0].date % 100;
                    const idx = 'user' + num;
                    const pict = UserIcons.PNG[idx];
                    // console.log('pict..', pict, idx)
                    return  (
                        <div
                            key={user}
                            onClick={() => handlerClick(user)}
                            className={`${s.UserPictWrap} ${user === selectedUserId ? s.focus : ''}`}
                            role="listitem"
                        >
                            <img src={pict} alt="user" className={s.UserPict} />

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
