import React from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useAppSelector } from 'store/hook';
import { useMailsQuery } from 'store/api/mailsApi';
import { selectYourId } from 'store/slices/auth';
import { MailItem } from './MailItem';
import s from '../Services.module.sass';

export const Mail = () => {
    const yourId = useAppSelector(selectYourId);
    const { data: mails } = useMailsQuery(yourId ?? skipToken);

    return (
        <>
            <div className={s.Main}>
                { mails && mails.length === 0
                    ?   <div className={s.MainPlaceholder}>
                            <p>No mails...</p>
                        </div>
                    :   mails?.map((mail) => {
                            return (
                                <div key={mail.id} role="listbox">
                                    <MailItem mail={mail} />
                                </div>
                            )
                        })
                }
            </div>

            <div className={s.Footer}>
                Mail service footer
            </div>
        </>
    );
};
