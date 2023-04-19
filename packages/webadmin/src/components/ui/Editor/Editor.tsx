import React from 'react';
import ReactQuill from "react-quill";
import { modules } from './EditorConfig';
import s from './Editor.module.sass';

interface iProps {
    content: string | undefined,
    onSubmit: () => void,
    onClose: () => void,
    setContent: React.Dispatch<string>,
}

export const Editor = ({ content = '', onSubmit, onClose, setContent }: iProps) => {

    return (
        <div>
            <div className={s.FormBodyEditor}>
                <ReactQuill
                    className={s.Quill}
                    modules={modules}
                    theme='snow'
                    value={content}
                    onChange={setContent}
                />
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button}
                    type="button"
                    value="Close"
                    onClick={onClose} />
                <input className={s.Button}
                    type="submit"
                    value="OK"
                    onClick={onSubmit} />
            </div>
        </div>
    );
};
