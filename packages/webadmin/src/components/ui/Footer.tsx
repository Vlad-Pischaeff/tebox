import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import * as ICON from 'assets/icons';
import s from './Footer.module.sass';

export const Footer = () => {
    return (
        <footer className={s.Footer}>
            <div className={s.FooterContainer}>
                <p className={s.FooterCopyright}>vlad pischaeff &copy; 2022</p>
                <a href='https://github.com/Vlad-Pischaeff/tChat1' target="_blank" rel="noreferrer">
                    <div className={s.FooterIcons}>
                        <ICON.GithubIcon />
                    </div>
                </a>
            </div>
            <div className={s.FooterContainer}>
                <ThemeToggle />
            </div>
        </footer>
    );
};
