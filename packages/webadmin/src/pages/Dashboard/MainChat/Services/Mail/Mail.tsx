import React from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react'
// import { useForm } from 'react-hook-form';
import { useAppSelector } from 'store/hook';
import { useMailsQuery } from 'store/api/mailsApi';
import { selectYourId } from 'store/slices/auth';
// import { useAddTodoMutation } from 'store/api/todosApi';
import { MailItem } from './MailItem';
import s from '../Services.module.sass';

// type tFormInputs = {
//     description: string;
// };

export const Mail = () => {
    // eslint-disable-next-line
    const yourId = useAppSelector(selectYourId);
    const { data: mails } = useMailsQuery(yourId ?? skipToken);

    // console.log('mails...', yourId, mails)
    // eslint-disable-next-line
    // const onSubmit = (data: tFormInputs) => {
    //     // вызываем API '/mails'
    //     addTodo(data);
    //     resetField('description');
    // };

    // const openModal = () => {
    //     // TODO add logic
    // }

    return (
        <>
            {/* <input type="button" className={s.AddItem} value="+ write mail" onClick={openModal} /> */}

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
