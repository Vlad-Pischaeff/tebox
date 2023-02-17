import React, { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setServiceMenuCategory, setHiddenPanelServices, selectUIState } from 'store/slices/ui';
import { MENU, tServiceMenu} from './ServicesVariables';
import * as ICON from 'assets/icons';
import s from './Services.module.sass';

export const ServicesHeader = () => {
    const dispatch = useAppDispatch();
    const services = useAppSelector(selectUIState('services'));

    const NAVIGATION = useMemo(() => ([
        { name: MENU[0], render: () => <ICON.TodosIcon active={services === MENU[0]} />},
        { name: MENU[1], render: () => <ICON.NotesIcon active={services === MENU[1]} />},
        { name: MENU[2], render: () => <ICON.MailIcon active={services === MENU[2]} />},
        { name: MENU[3], render: () => <ICON.ChatIcon active={services === MENU[3]} />},
    ]), [services]);

    const handlerClick = (name: tServiceMenu) => {
        dispatch(setServiceMenuCategory(name));
    }

    const hidePanelServices = () => {
        dispatch(setHiddenPanelServices(true));
    }

    return (
        <div className={s.header} role="navigation">
            <div className={s.RowFlexContainer}>
                { NAVIGATION.map(element =>
                    <div key={element.name} onClick={() => handlerClick(element.name)}>
                        {element.render()}
                    </div>
                )}
            </div>
            <div onClick={hidePanelServices}>
                <ICON.DblArrowLeft />
            </div>
        </div>
    );
};
