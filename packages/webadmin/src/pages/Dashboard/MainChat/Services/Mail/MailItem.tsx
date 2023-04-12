import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { removeContentEditableAttr } from '@tebox/utils/lib';
import { useDeleteMailMutation } from 'store/api/mailsApi';
import { iMails } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from '../Services.module.sass';

interface iProps {
    mail: iMails
}

export const MailItem = ({ mail }: iProps) => {
    const [ deleteMail ] = useDeleteMailMutation();

    const removeItem = () => {
        deleteMail(mail.id);
    }

    return (
        <div className={s.mailContainer} role="listitem">
            <div className={s.mailHeader}>
                <p>
                    <span className={s.gray}> from: </span>
                    <Link className={s.link} to={`mailto:${mail.from}`}>
                        {mail.from}
                    </Link>
                    <span className={s.gray}> at: </span>
                    {new Date(mail.date).toLocaleDateString()}
                </p>
                <div className={s.propertyIcon} onClick={removeItem}>
                    <ICON.TrashIcon />
                </div>
            </div>

            <div className={s.mailBody}>
                { parse(removeContentEditableAttr(mail.message)) }
            </div>
        </div>
    );
};
