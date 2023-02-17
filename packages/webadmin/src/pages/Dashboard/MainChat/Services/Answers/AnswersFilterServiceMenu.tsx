import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setAnswersFilterIcon } from 'store/slices/ui';
import { withHiddenMouseClickArea } from 'components/HOC';
import { SYMBOLS } from './AnswersVariables';
import s from '../Services.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    closeMenu: (e: React.MouseEvent<HTMLDivElement>) => void,
}

const AnswersFilterSM = ({ closeMenu }: iProps) => {
    const dispatch = useAppDispatch();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setAnswersFilterIcon(e.currentTarget.id));
        closeMenu(e);           // ✅ hide menu after filtering
    }

    return (
        <div className={s.ServiceMenuFooterWrap} role="menu">
            <div
                id='none'
                className={s.ServiceMenuItem}
                role="menuitem"
                onClick={handlerSelectColor}
            >
                Show all...
            </div>
            <div className={s.ServiceMenuFooterGrid}>
                { SYMBOLS.map((symbol) => (
                    <div
                        key={symbol.key}
                        id={symbol.key}
                        className={s.ServiceMenuItem}
                        role="menuitem"
                        onClick={handlerSelectColor}
                    >
                        {symbol.render()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const AnswersFilterServiceMenu = withHiddenMouseClickArea(AnswersFilterSM);
