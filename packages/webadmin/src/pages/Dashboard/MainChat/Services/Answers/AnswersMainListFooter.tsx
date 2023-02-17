import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setItemServiceMenu, selectUIState } from 'store/slices/ui';
import { AnswersFilterServiceMenu } from './AnswersFilterServiceMenu';
import { SYMBOLS_OBJ } from './AnswersVariables';
import s from '../Services.module.sass';

export const AnswersMainListFooter = () => {
    const dispatch = useAppDispatch();
    const answersFilterIcon = useAppSelector(selectUIState('answersFilterIcon'));
    const serviceMenu = useAppSelector(selectUIState('serviceMenu'));

    const handlerShowFilterMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setItemServiceMenu({ answersFilter: 'none' }));
    }

    return (
        <div className={s.Footer}>
            <span>Filter answers by &nbsp;</span>
            <span>
                { answersFilterIcon === 'none'
                    ? 'none'
                    : SYMBOLS_OBJ[answersFilterIcon]()
                }
            </span>

            <div className={s.FooterText} onClick={handlerShowFilterMenu}>
                Select...
            </div>

            { !!serviceMenu.answersFilter &&
                <AnswersFilterServiceMenu />
            }
        </div>
    );
};
