import React, { ComponentType, MouseEvent } from 'react';
import { useAppDispatch } from 'store/hook';
import { setItemServiceMenu } from "store/slices/ui";
import s from './hocStyles.module.sass';

interface iProps {
    closeMenu: (e: MouseEvent<HTMLDivElement>) => void,
}

export const withHiddenMouseClickArea =
    <T,>(WrappedComponent: ComponentType<T>) => {

        const NewComp = (props: Omit<T, keyof iProps>) => {
            const dispatch = useAppDispatch();

            const handlerHideMenu = (e: MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                dispatch(setItemServiceMenu(null));
            }

            return (
                <div className={s.ServiceMenuContainer}>
                    <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

                    <WrappedComponent { ...(props as T) } closeMenu={handlerHideMenu} />
                </div>
            );
        }

        return NewComp;
}
