import React from 'react';
import { useEditNoteMutation } from 'store/api/notesApi';
import { withHiddenMouseClickArea } from 'components/HOC';
import { iNotes } from 'store/api/apiTypes';
import { COLORS } from './NotesVariables';
import * as ICONS from 'assets/icons';
import s from '../Services.module.sass';

interface iProps {
    note: iNotes,
    closeMenu: (e: React.MouseEvent<HTMLDivElement>) => void,
}

export const NotesMarkSM = ({ note, closeMenu }: iProps) => {
    const [ updateNote ] = useEditNoteMutation();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const body = { type: e.currentTarget.id };
        const data = { id: note.id, ...body };
        updateNote(data);
        closeMenu(e);       // ✅ hide menu after marking
    }

    return (
        <div className={s.ServiceMenuWrap} role="menu">
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

export const NotesMarkServiceMenu = withHiddenMouseClickArea(NotesMarkSM);
