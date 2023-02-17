import React from 'react';
import { useEditAnswerMutation } from 'store/api/answersApi';
import { withHiddenMouseClickArea } from 'components/HOC';
import { iAnswers } from 'store/api/apiTypes';
import { SYMBOLS } from './AnswersVariables';
import s from '../Services.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    closeMenu: (e: React.MouseEvent<HTMLDivElement>) => void,
    answer: iAnswers
}

export const AnswersMarkSM = ({ answer, closeMenu }: iProps) => {
    const [ updateAnswer ] = useEditAnswerMutation();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const body = { type: e.currentTarget.id };
        const data = { id: answer.id, ...body };
        updateAnswer(data);
        closeMenu(e);           // ✅ hide menu after marking
    }

    return (
        <div className={s.ServiceMenuGrid} role="menu">
            { SYMBOLS.map(symbol =>
                <div
                    key={symbol.key}
                    id={symbol.key}
                    className={s.ServiceMenuItem}
                    role="menuitem"
                    onClick={handlerSelectColor}
                >
                    {symbol.render()}
                </div>
            )}
        </div>
    );
};

export const AnswersMarkServiceMenu = withHiddenMouseClickArea(AnswersMarkSM);
