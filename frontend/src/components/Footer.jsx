import React, { useState, useEffect } from 'react';
import logoUrl from '../assets/logo.png';

function Footer({ hideCTA }) {
    return (
        <>
            {/* CTA BANNER */}
            {!hideCTA && (
                <section className="cta-banner">
                    <div className="container">
                        <h2>Need Expert Guidance?</h2>
                        <p>Our counsellors have helped 2,40,000+ students achieve their study abroad dreams. Get your free consultation today.</p>
                        <div className="cta-btns" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            <a href="tel:+917355573555" className="btn btn-orange btn-lg" style={{ padding: '15px 40px', fontSize: '20px' }}>
                                📱 Call 24×7 Helpline: +91 73555 73555
                            </a>
                        </div>
                    </div>
                </section>
            )}


            <footer className="footer" id="contact" style={{ background: '#f0f9ff' }}>
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <img src={logoUrl} alt="Kanan" style={{ height: '38px', marginBottom: '16px' }} />
                            <p style={{ lineHeight: '1.6', opacity: '0.8', marginBottom: '20px', color: '#475569' }}>
                                India's leading Study Abroad consultant with 25+ years of experience helping students achieve their global dreams.
                            </p>
                        </div>
                        <div>
                            <h4>Our Events</h4>
                            <ul>
                                <li><a href="#">Kanan Student Visa Fair</a></li>
                                <li><a href="#">Abroad Education Expo</a></li>
                                <li><a href="#">Kanan Mega Mock Test Drive</a></li>
                                <li><a href="#">Parents–Teacher Meets</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Destinations</h4>
                            <ul>
                                <li><a href="#">Study in Canada</a></li>
                                <li><a href="#">Study in USA</a></li>
                                <li><a href="#">Study in UK</a></li>
                                <li><a href="#">Study in Germany</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Contact Us</h4>
                            <ul style={{ color: '#475569' }}>
                                <li>📱 24×7: +91 73555 73555</li>
                                <li>📧 <a href="mailto:baroda@kananinternational.com">baroda@kananinternational.com</a></li>
                                <li>📍 Vadodara, Gujarat</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 Kanan International. All rights reserved.</p>
                        <p style={{ fontSize: '13px' }}>
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>
                        </p>
                        <p style={{ fontWeight: '700', color: '#003399' }}>Let's Grow Globally</p>
                    </div>
                </div>
            </footer>

            {/* FLOATING BUTTONS */}
            <FloatingButtons />
        </>
    );
}

function FloatingButtons() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const fn = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);
    return (
        <div className="floating">
            <button className={`fab fab-up ${visible ? 'visible' : ''}`} style={{ borderRadius: '8px', width: 'auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', border: '1.5px solid #00964f', color: '#00964f', background: '#fff' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to Top <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15" /></svg>
            </button>
        </div>
    );
}

export default Footer;
