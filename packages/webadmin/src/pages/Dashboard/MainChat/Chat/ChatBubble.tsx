import React, { useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { formatDistanceToNow } from 'date-fns';
import { removeContentEditableAttr } from '@tebox/utils/lib';
import { useAppSelector } from 'store/hook';
import { selectYourId } from 'store/slices/auth';
import { useGetUserQuery } from 'store/api/usersApi';
import { iMessage } from  'store/api/apiTypes';
import s from './Chat.module.sass';

interface iProps {
    msg: iMessage
}

export const ChatBubble = ({ msg }: iProps) => {
    const yourId = useAppSelector(selectYourId);
    const { data: memberProfile } = useGetUserQuery(msg.from, { skip: msg.from === yourId});
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth'});
    }, []);

    return (
        <>
            { !!memberProfile &&
                <img src={memberProfile.image} alt="avatar" className={s.mngImage} />
            }

            <div className={s.MsgContainer} ref={chatRef}>
                <div className={s.date}>
                    {
                        formatDistanceToNow(
                            new Date(msg.date),
                            { addSuffix: true, includeSeconds: true }
                        )
                    }
                </div>

                <div className={s.msg}>
                    {
                        typeof msg.message === 'string' &&
                            parse(removeContentEditableAttr(msg.message))
                    }
                </div>
            </div>
        </>
    );
};
