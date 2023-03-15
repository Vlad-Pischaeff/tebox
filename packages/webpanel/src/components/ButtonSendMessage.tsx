import React from 'react';
import s from 'styles/ButtonSendMessage.module.sass';

export const ButtonSendMessage = React.memo(() => {

    ButtonSendMessage.displayName = 'ButtonSendMessage';

    return (
        <button className={s.Button} type="submit" value="OK" >
            <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" >
                <g className={s.strokeStyle}>
                    <path d="M0,172v-172h172v172z"></path>
                    <g className={s.fillStyle}>
                        <path d="M49.60547,0.21875c-0.30859,-0.24219 -0.73047,-0.27734 -1.07812,-0.08984l-48,26c-0.34766,0.1875 -0.55078,0.56641 -0.51172,0.96094c0.03516,0.39453 0.30078,0.73047 0.67578,0.85156l13.64453,4.45313l-1.32031,13.50781c-0.04297,0.42969 0.19531,0.83594 0.58984,1.00391c0.125,0.05859 0.26172,0.08594 0.39453,0.08594c0.27734,0 0.55078,-0.11719 0.74219,-0.33594l8.60547,-9.72266l12.95703,12.77344c0.1875,0.18359 0.4375,0.28516 0.69531,0.28516c0.08984,0 0.17969,-0.01562 0.26953,-0.03906c0.33984,-0.09375 0.60547,-0.36719 0.69141,-0.71094l12,-48c0.09375,-0.38281 -0.04297,-0.78516 -0.35547,-1.02344zM16.34375,32.21094l19.51172,-15.77734l-13.29687,18.41016l-7.27734,8.21484z"></path>
                    </g>
                </g>
            </svg>
        </button>
    );
});
