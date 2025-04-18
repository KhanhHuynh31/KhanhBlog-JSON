import React from 'react'
import "./Footer.css"
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <>
            <hr className='footer__hr'></hr>
            <div className='footer__content'>
                <div className='footer__intro'>
                    <h1>Khanh's Blog</h1>
                    <p>My blog about create website with ReactJS framework, sharing tips, tricks, techniques to build websites. Hope everyone likes my posts and applies it successfully.</p>
                    <div className='footer__socials'>
                        <a href='https://www.facebook.com/huynhkhanh2k/' target="_blank" rel="noopener noreferrer">
                            <p className='footer__facebook'>f</p>
                        </a>
                        <a href='https://github.com/quoc-khanh-31' target="_blank" rel="noopener noreferrer">
                            <p className='footer__github'>G</p>
                        </a>
                    </div>
                </div>
                <div className='footer__menu'>
                    <h2>FEATURES</h2>
                    <Link to="/" className={"menu__link"}>{t('home')}</Link>
                    <Link to="/category" className={"menu__link"}>{t('category')}</Link>
                </div>

                <div className='footer__contact'>
                    <h2>CONTACT</h2>
                    <p>Email:<label> qk31082000@gmail.com</label></p>
                </div>
            </div>
        </>
    )
}
