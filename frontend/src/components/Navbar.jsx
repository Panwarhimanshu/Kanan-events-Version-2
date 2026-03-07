import React, { useState } from 'react';
import logoUrl from '../assets/logo.png';

function Navbar({ onOpenBooking }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* TOPBAR */}
            <div className="topbar">
                <div className="container">
                    <span className="topbar-info">📱 24×7: <a href="tel:+916356568111" style={{ color: 'var(--k-orange)', fontWeight: '700' }}>+91 6356 568111</a></span>
                    <span className="topbar-stats">🏆 25+ Years Experience</span>
                </div>
            </div>

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
                        <a href="tel:+916356568111" className="btn btn-helpline">📱 24×7 Help</a>
                        <button className="btn btn-primary" onClick={() => { onOpenBooking(); setMobileMenuOpen(false); }}>Book Free Counselling</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
