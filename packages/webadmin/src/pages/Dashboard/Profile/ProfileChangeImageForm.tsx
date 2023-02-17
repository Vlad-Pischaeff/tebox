import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { canvasPreview, canvasHidden, customCenterCrop } from './ProfileUtils';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, setEditedImage, selectUIState, eModal } from 'store/slices/ui';
import { useUpdateUserMutation } from 'store/api/usersApi';
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';
import sl from './Profile.module.sass';
import 'react-image-crop/dist/ReactCrop.css';

const ASPECT = 1;
const ROTATE = 0;
const SCALE = 1;

const Form = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const imgSrc = useAppSelector(selectUIState('editedImage'));
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
    const [ crop, setCrop ] = useState<Crop>();
    const [ completedCrop, setCompletedCrop ] = useState<PixelCrop>();
    const [ image64, setImage64 ] = useState('');
    const [ updateUser ] = useUpdateUserMutation();
    const { handleSubmit } = useForm();

    useEffect(() => {
        setCroppedImage();
        // eslint-disable-next-line
    }, [completedCrop]);

    const setCroppedImage = async () => {
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current &&
            hiddenCanvasRef.current
        ) {
            await canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop,
                SCALE,
                ROTATE,
            );
            const avatar = await canvasHidden(
                previewCanvasRef.current,
                hiddenCanvasRef.current
            );
            setImage64(avatar);
        }
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        setCrop(customCenterCrop(width, height, ASPECT));
    }

    const onSubmit = async () => {
        // ✅ вызываем API '/users', обновляем 'image'
        if (image64 !== '') {
            updateUser({ id: user.id, body: { image: image64 }});
            closeModal();
        }
    };

    const closeModal = () => {
        setImage64('');
        dispatch(setEditedImage(''));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={sl.imageContainer}>
                { (!!imgSrc && typeof imgSrc === 'string')
                    ?   <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={ASPECT}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                style={{
                                    maxWidth: '400px',
                                    maxHeight: '300px',
                                    transform: `scale(${SCALE}) rotate(${ROTATE}deg)`
                                }}
                                onLoad={onImageLoad} />
                        </ReactCrop>
                    :   <p>loading image...</p>
                }
            </div>

            <div className={sl.previewContainer}>
                { !!completedCrop && (
                    <div>
                        <canvas className={sl.previewCanvas} ref={previewCanvasRef} />
                        <canvas className={sl.hiddenCanvas} ref={hiddenCanvasRef} />
                    </div>
                )}
            </div>

            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Update image" />
            </div>
        </form>
    );
};

export const ProfileChangeImageForm = withModalBG(Form);
