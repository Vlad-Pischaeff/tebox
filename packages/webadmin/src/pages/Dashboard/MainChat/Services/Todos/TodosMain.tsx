import React, { useMemo, useState } from 'react';
import { useTodosQuery} from 'store/api/todosApi';
import { TodosItem } from './TodosItem';
import { iTodos } from 'store/api/apiTypes';
import * as UI from 'components/ui';
import s from '../Services.module.sass';

const TYPES = [ "All", "Completed", "Pending" ] as const;
type tTypes = typeof TYPES[number];

export const TodosMain = () => {
    const { data, isSuccess, isLoading } = useTodosQuery('');
    const [ checked, setChecked ] = useState<tTypes>("All");

    const FILTER = useMemo(() => ({
        [TYPES[0]]: (data: iTodos[]) => data,
        [TYPES[1]]: (data: iTodos[]) => data.filter(todo => todo.done === true),
        [TYPES[2]]: (data: iTodos[]) => data.filter(todo => todo.done === false),
    }), []);

    return (
        <>
            <div className={s.Main} role="list">
                { data && data.length === 0 &&
                    <div className={s.MainPlaceholder}>
                        <p>No todos...</p>
                    </div>
                }
                { isSuccess && data &&
                    FILTER[checked](data).map(todo =>
                        <TodosItem key={todo.id} todo={todo} />
                    )
                }
                { isLoading && <div>Loading...</div>}
            </div>

            <div className={s.Footer}>
                { TYPES.map(type =>
                        <div className={s.FooterItem} key={type}>
                            <p className={checked === type ? s.done : ''}>{type}</p>
                            <UI.CheckBox
                                idx={type}
                                checked={checked === type}
                                onChange={() => setChecked(type)} />
                        </div>
                    )
                }
            </div>
        </>
    );
};
