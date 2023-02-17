import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedImage, eModal } from 'store/slices/ui';
import * as ICON from 'assets/icons';
import s from './Profile.module.sass';

export const ProfileChangeImageButton = () => {
    const dispatch = useAppDispatch();

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            dispatch(setServicesModal(eModal.changeImage));

            const reader = new FileReader();
            reader.onload = () => {
                dispatch(setEditedImage(reader.result?.toString() || ''))
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <div>
            <label htmlFor="file-input" className={s.label}>
                <div className={s.ItemIcon}>
                    <ICON.EditIcon />
                </div>
            </label>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                style={{ display: 'none' }} />
        </div>
    );
};
