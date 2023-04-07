import React from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'store/hook';
import { useMailsQuery } from 'store/api/mailsApi';
import { useWebsitesQuery, useWebsitesHashQuery } from 'store/api/websitesApi';
import { selectYourId } from 'store/slices/auth';
import { useAddTodoMutation } from 'store/api/todosApi';
import s from '../Services.module.sass';

type tFormInputs = {
    description: string;
};

export const Mail = () => {
    // eslint-disable-next-line
    const yourId = useAppSelector(selectYourId);
    // const { data: websites } = useWebsitesQuery('');
    // const { data: websitesHash } = useWebsitesHashQuery();
    const { data: mails } = useMailsQuery(yourId ?? skipToken);
    const [ addTodo ] = useAddTodoMutation();
    // eslint-disable-next-line
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();
    console.log('mails...', yourId, mails)
    // eslint-disable-next-line
    // const onSubmit = (data: tFormInputs) => {
    //     // вызываем API '/mails'
    //     addTodo(data);
    //     resetField('description');
    // };

    const openModal = () => {
        // TODO add logic
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ write mail" onClick={openModal} />

            {/* <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.FormBody}>
                    <fieldset>
                        <label>Description</label>
                        <input { ...register("description") } placeholder="My mail..." />
                    </fieldset>
                </div>

                <input type="submit" value="Add mail" />
            </form> */}

            <div className={s.Main}>
                { mails && mails.length === 0
                    ?   <div className={s.MainPlaceholder}>
                            <p>No mails...</p>
                        </div>
                    :   mails?.map((mail) => {
                            return (
                                <div key={mail.id} className={s.mailContainer}>
                                    <p>
                                        <span className={s.gray}> from: </span>
                                        {mail.from}
                                        <span className={s.gray}> at: </span>
                                        {new Date(mail.date).toLocaleDateString()}
                                    </p>
                                    <p className={s.mailBody}>{mail.message}</p>

                                    {/* <p>
                                        <span className={s.gray}>at: </span>
                                        {new Date(mail.date).toLocaleDateString()}
                                    </p> */}
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
