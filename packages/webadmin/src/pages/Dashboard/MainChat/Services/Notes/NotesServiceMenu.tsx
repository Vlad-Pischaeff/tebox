import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedNote, setItemServiceMenu, eModal } from 'store/slices/ui';
import { useDeleteNoteMutation } from 'store/api/notesApi';
import { withHiddenMouseClickArea } from 'components/HOC';
import * as ICONS from 'assets/icons';
import { iNotes } from 'store/api/apiTypes';
import s from '../Services.module.sass';

interface iProps {
    note: iNotes,
    closeMenu: (e: React.MouseEvent<HTMLDivElement>) => void,
}

export const NotesSM = ({ note, closeMenu }: iProps) => {
    const dispatch = useAppDispatch();
    const [ deleteNote ] = useDeleteNoteMutation();

    const handlerEditNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setEditedNote(note));
        dispatch(setServicesModal(eModal.note));
        handlerHideMenu(e);    // ✅ hide menu after editing
    }

    const handlerMarkNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ noteMark: note.id }));
    }

    const handlerDeleteNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        deleteNote({ id: note.id });
        handlerHideMenu(e);    // ✅ hide menu after deleting
    }

    const handlerHideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        closeMenu(e);
    }

    const handlerOpenEditor = () => {
        dispatch(setEditedNote(note));
        dispatch(setServicesModal(eModal.editor));
    }

    return (
        <div className={s.ServiceMenuWrap} role="menu">
            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerEditNote}>
                <ICONS.EditIcon />
                <p>Edit note</p>
            </div>

            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerOpenEditor}>
                <ICONS.OpenEditorIcon />
                <p>Edit note in Editor</p>
            </div>

            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerMarkNote}>
                <ICONS.LabelIcon />
                <p>Mark note</p>
            </div>

            <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerDeleteNote}>
                <ICONS.TrashIcon />
                <p>Delete note</p>
            </div>
        </div>
    );
};

export const NotesServiceMenu = withHiddenMouseClickArea(NotesSM);
