import React from 'react';
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
                {mail.from}
                <span className={s.gray}> at: </span>
                {new Date(mail.date).toLocaleDateString()}
            </p>
            <p className={s.mailBody}>{mail.message}</p>
        </div>
    );
};
