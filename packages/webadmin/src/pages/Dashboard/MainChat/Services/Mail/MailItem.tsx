import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { removeContentEditableAttr } from '@tebox/utils/lib';
import { iMails } from 'store/api/apiTypes';
import s from '../Services.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    mail: iMails
}

export const MailItem = ({ mail }: iProps) => {
    return (
        <div className={s.mailContainer} role="listitem">
            <p>
                <span className={s.gray}> from: </span>
                <Link className={s.link} to={`mailto:${mail.from}`}>
                    {mail.from}
                </Link>
                <span className={s.gray}> at: </span>
                {new Date(mail.date).toLocaleDateString()}
            </p>
            <div className={s.mailBody}>
                { parse(removeContentEditableAttr(mail.message)) }
            </div>
        </div>
    );
};
