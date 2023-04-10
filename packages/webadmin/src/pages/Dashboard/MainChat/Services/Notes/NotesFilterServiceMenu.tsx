import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setNotesFilterColor } from "store/slices/ui";
import { withHiddenMouseClickArea } from 'components/HOC';
import { COLORS } from './NotesVariables';
import * as ICONS from 'assets/icons';
import s from '../Services.module.sass';

interface iProps {
    closeMenu: (e: React.MouseEvent<HTMLDivElement>) => void,
}

export const NotesFilterSM = ({ closeMenu }: iProps) => {
    const dispatch = useAppDispatch();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setNotesFilterColor(e.currentTarget.id));
        closeMenu(e);           // ✅ hide menu after filtering
    }

    return (
        <div className={s.ServiceMenuFooterWrap} role="menu">
            { COLORS.map(color =>
                <div
                    key={color.key}
                    id={color.value}
                    className={s.ServiceMenuItem}
                    role="menuitem"
                    onClick={handlerSelectColor}
                >
                    <ICONS.LabelIcon fill={color.value} />
                    <p>{color.key}</p>
                </div>
            )}
        </div>
    );
};

export const NotesFilterServiceMenu = withHiddenMouseClickArea(NotesFilterSM);
