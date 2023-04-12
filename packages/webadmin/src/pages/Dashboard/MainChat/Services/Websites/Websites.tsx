import React from 'react';
// import { useAppDispatch } from 'store/hook';
// import { setServicesModal, eModal } from 'store/slices/ui';
// import { TodosMain } from './TodosMain';
// import { TodosModals } from './TodosModals';
import s from '../Services.module.sass';


export const Websites = () => {
    // const dispatch = useAppDispatch();

    // const openModal = () => {
    //     dispatch(setServicesModal(eModal.todo));
    // }

    return (
        <>
            <div className={s.Main}>
                <div className={s.MainPlaceholder}>
                    <p>No Websites..You can add website in Your profile..</p>
                </div>
            </div>

            <div className={s.Footer}>
                Websites service footer
            </div>
        </>
    );
};
