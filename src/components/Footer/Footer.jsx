import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
                <p>
                    Built by <a href="https://github.com/albin" target="_blank" rel="noopener noreferrer">Albine Kqiku</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
