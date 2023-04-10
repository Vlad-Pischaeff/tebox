import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedAnswer, setItemServiceMenu, eModal } from 'store/slices/ui';
import { useDeleteAnswerMutation } from 'store/api/answersApi';
import { withHiddenMouseClickArea } from 'components/HOC';
import * as ICONS from 'assets/icons';
import { iAnswers } from 'store/api/apiTypes';
import s from '../Services.module.sass';

interface iProps {
    closeMenu: (e: React.MouseEvent<HTMLDivElement>) => void,
    answer: iAnswers
}

export const AnswersSM = ({ answer, closeMenu }: iProps) => {
    const dispatch = useAppDispatch();
    const [ deleteAnswer ] = useDeleteAnswerMutation();

    const handlerEditAnswer = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setEditedAnswer(answer));
        dispatch(setServicesModal(eModal.answer));
        closeMenu(e);           // ✅ hide menu after editing
    }

    const handlerMarkAnswer = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ answerMark: answer.id }));
    }

    const handlerDeleteAnswer = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        deleteAnswer({ id: answer.id });
        closeMenu(e);           // ✅ hide menu after deleting
    }

    const handlerOpenEditor = () => {
        dispatch(setEditedAnswer(answer));
        dispatch(setServicesModal(eModal.editor));
    }

    return (
        <div className={s.ServiceMenuWrap} role="menu">
            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerEditAnswer}>
                <ICONS.EditIcon />
                <p>Edit answer</p>
            </div>

            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerOpenEditor}>
                <ICONS.OpenEditorIcon />
                <p>Edit answer in Editor</p>
            </div>

            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerMarkAnswer}>
                <ICONS.LabelIcon />
                <p>Mark answer</p>
            </div>

            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerDeleteAnswer}>
                <ICONS.TrashIcon />
                <p>Delete answer</p>
            </div>
        </div>
    );
};

export const AnswersServiceMenu = withHiddenMouseClickArea(AnswersSM);
