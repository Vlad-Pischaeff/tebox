import React from 'react';
import parse from 'html-react-parser';
import { removeContentEditableAttr } from '@tebox/utils/lib';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIState, setItemServiceMenu } from "store/slices/ui";
import { NotesServiceMenu } from './NotesServiceMenu';
import { NotesMarkServiceMenu } from './NotesMarkServiceMenu';
import { iNotes } from 'store/api/apiTypes';
import * as ICONS from 'assets/icons';
import s from '../Services.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

export const NotesItem = ({ note }: iProps) => {
    const dispatch = useAppDispatch();
    const serviceMenu = useAppSelector(selectUIState('serviceMenu'));

    const showMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ noteActions: note.id }));
    }

    return (
        <details className={s.Summary}>
            <summary>
                <div className={s.SummaryContainer}>
                    <span className={s.SummaryTitle}
                        style={{ borderLeft: note.type !== 'none' ? `5px solid ${note.type}` : '' }}
                    >
                        {note.title}
                    </span>

                    <div className={s.SummaryMenu} onClick={showMenu}>
                        <ICONS.ServiceMenuIcon />
                    </div>

                    { serviceMenu.noteActions === note.id &&
                        <NotesServiceMenu note={note} />
                    }

                    { serviceMenu.noteMark === note.id &&
                        <NotesMarkServiceMenu note={note} />
                    }
                </div>
            </summary>
            <div className={s.SummaryDescription}>
                { parse(removeContentEditableAttr(note.description)) }
            </div>
        </details>
    );
};
