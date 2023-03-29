// eslint-disable-next-line
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectYourId, getSelectedUserId } from 'store/slices/auth';
import { useSendMessageMutation, websocketApi } from 'store/api/websocketApi';

export const useWebSocketMessage = () => {
    const dispatch = useAppDispatch();
    const yourId = useAppSelector(selectYourId);
    const selectedUserId = useAppSelector(getSelectedUserId);
    const [ sendMessage ] = useSendMessageMutation();

    const sendWsMessage = async (message: string) => {
        if (message && selectedUserId) {
            // ✅ шлем сообщение
            const msg = {
                'MSG_FROM_MANAGER': {
                    'from': yourId,
                    'to': selectedUserId,
                    'message': message,
                    'date': Date.now()
                }
            };
            await sendMessage(JSON.stringify(msg));

            // ✅ обновляем кэш сообщений

            dispatch(
                websocketApi.util.updateQueryData(
                    'getMessages',
                    yourId,
                    (draft) => {
                        draft[selectedUserId].msgs.push(msg['MSG_FROM_MANAGER']);
                    }
                )
            );

            return 'OK'
        }
    }

    const resetNewMessagesCounter = (client: string) => {
        dispatch(
            websocketApi.util.updateQueryData(
                'getMessages',
                yourId,
                (draft) => { draft[client].cnt = 0; }
            )
        );
    }

    return ({
        sendWsMessage,
        resetNewMessagesCounter
    });
};
