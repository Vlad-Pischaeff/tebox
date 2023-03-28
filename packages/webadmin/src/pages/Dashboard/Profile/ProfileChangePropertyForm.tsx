import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectYourId } from 'store/slices/auth';
import { setServicesModal, eModal } from 'store/slices/ui';
import { useUpdateUserMutation, useGetUserQuery } from 'store/api/usersApi';
import { withInjectPropertyModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';

type tFormInputs = {
    [key: string]: string;
}

const Form = ({ userProperty }: { userProperty: 'greeting' | 'alias'}) => {
    const dispatch = useAppDispatch();
    const yourId = useAppSelector(selectYourId);
    const { data } = useGetUserQuery(yourId, { skip: !yourId });
    const [ updateUser ] = useUpdateUserMutation();
    const { setFocus, setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        !!data && setValue(userProperty, data[userProperty]);
        setFocus(userProperty, { shouldSelect: false });
    }, [setValue, setFocus, data, userProperty]);

    const onSubmit = async (formData: tFormInputs) => {
        // ✅ вызываем API '/users', обновляем 'alias'
        const value = formData[userProperty];
        updateUser({ id: yourId, body: { [userProperty]: value }});
        closeModal();
    };

    const closeModal = () => {
        resetField(userProperty);
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>{userProperty}</label>
                    <input
                        { ...register(userProperty) }
                        className={s.FormInput}
                        placeholder={`add ${userProperty}...`} />
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value={`Update ${userProperty}`} />
            </div>
        </form>
    );
};

export const ProfileChangePropertyForm = withInjectPropertyModalBG(Form);
