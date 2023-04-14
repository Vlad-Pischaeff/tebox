import React from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppSelector } from 'store/hook';
import { selectYourId } from 'store/slices/auth';
import { selectUIState } from 'store/slices/ui';
import { useAnswersQuery } from 'store/api/answersApi';
import { AnswersItem } from './AnswersItem';
import s from '../Services.module.sass';

export const AnswersMainList = () => {
    const yourId = useAppSelector(selectYourId);
    const answersFilterIcon = useAppSelector(selectUIState('answersFilterIcon'));
    const { data, isSuccess, isLoading } = useAnswersQuery({ userId: yourId } ?? skipToken);

    const filterData = () => {
        if (isSuccess && data) {
            let filteredData = data;

            if (answersFilterIcon !== 'none') {
                filteredData = data.filter(answer => answer.type === answersFilterIcon);
            }

            return filteredData.map(answer =>
                <div key={answer.id} role="listitem">
                    <AnswersItem answer={answer} />
                </div>
            )
        }
    }

    return (
        <div className={s.Main} role="list">
            { data && data.length === 0 &&
                <div className={s.MainPlaceholder}>
                    <p>No answers/questions...</p>
                </div>
            }

            { filterData() }

            { isLoading && <div>Loading...</div>}
        </div>
    );
};
