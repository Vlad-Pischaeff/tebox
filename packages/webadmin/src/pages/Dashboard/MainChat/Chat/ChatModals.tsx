import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIState, eModal } from 'store/slices/ui';
import { ChatPickEmojiForm } from './ChatPickEmojiForm';

type eProfileModals = Extract<eModal, eModal.pickEmoji>;

const MODAL_FORMS = {
    [eModal.pickEmoji]:           <ChatPickEmojiForm />,
}

export const ChatModals = () => {
    const modal = useAppSelector(selectUIState('servicesModal'));

    return (
        <>
            { MODAL_FORMS[modal as eProfileModals] }
        </>
    );
};
