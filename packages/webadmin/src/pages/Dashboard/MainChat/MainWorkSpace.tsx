import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIState, setHiddenPanelServices } from 'store/slices/ui';
import { Services } from 'pages/Dashboard/MainChat/Services';
import { Chat } from 'pages/Dashboard/MainChat/Chat';
import * as ICON from 'assets/icons';
import s from './MainWorkSpace.module.sass';

export const MainWorkSpace = () => {
    const dispatch = useAppDispatch();
    const hiddenPanelServices = useAppSelector(selectUIState('hiddenPanelServices'));

    const showPanelServices = () => {
        dispatch(setHiddenPanelServices(false));
    }

    return (
        <div className={hiddenPanelServices ? s.WorkSpaceFull : s.WorkSpaceSplited}>

            { hiddenPanelServices
                ?   <div className={s.ShowServiceMenuButton} onClick={showPanelServices}>
                        <ICON.DblArrowLeft />
                    </div>
                :   <div className={s.LeftWorkSpace}>
                        <Services />
                    </div>
            }

            <div className={s.RightWorkSpace}>
                <Chat />
            </div>
        </div>
    );
};
