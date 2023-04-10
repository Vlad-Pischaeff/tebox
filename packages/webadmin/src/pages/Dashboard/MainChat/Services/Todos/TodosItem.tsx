import React from 'react';
import { format } from 'date-fns';
import { useEditTodoMutation, useDeleteTodoMutation } from 'store/api/todosApi';
import * as UI from 'components/ui';
import * as ICON from 'assets/icons';
import { iTodos } from 'store/api/apiTypes';
import s from '../Services.module.sass';

interface iProps {
    todo: iTodos,
}

export const TodosItem = ({ todo }: iProps) => {
    const [ updateTodo ] = useEditTodoMutation();
    const [ deleteTodo ] = useDeleteTodoMutation();

    const handleChange = () => {
        const body = { done: !todo.done };
        const data = { id: todo.id, ...body };
        updateTodo(data);
    }

    const handleDelete = () => {
        const data = { id: todo.id };
        deleteTodo(data);
    }

    return (
        <div className={`${s.item} ${todo.done ? s.done : null}`} role="listitem">
            <div className={s.itemDesc}>
                {todo.description}
            </div>
            <div className={s.itemDate}>
                { format(new Date(todo.date), 'dd.MMM.yyyy') }
            </div>
            <div className={s.itemCheck}>
                <UI.CheckBox checked={todo.done} idx={todo.id} onChange={handleChange}/>
            </div>
            <div className={s.itemDelete} onClick={handleDelete}>
                <ICON.TrashIcon />
            </div>
        </div>
    );
};
