import React, { useState } from 'react';
import logoUrl from '../assets/logo.png';

function Navbar({ onOpenBooking }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="container nav-inner">
                    <a href="/" className="logo">
                        <img src={logoUrl} alt="Kanan.co" style={{ height: '38px', objectFit: 'contain' }} />
                    </a>

                    <button className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={`nav-actions ${mobileMenuOpen ? 'mobile-active' : ''}`}>
                        <a href="tel:+917355573555" className="btn btn-helpline">📱 24×7 Help</a>
                        <button className="btn btn-primary" onClick={() => { onOpenBooking(); setMobileMenuOpen(false); }}>Book Free Counselling</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
