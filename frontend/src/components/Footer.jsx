import React, { useState, useEffect } from 'react';
import logoUrl from '../assets/logo.png';

function Footer() {
    return (
        <>
            {/* CTA BANNER */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Need Expert Guidance?</h2>
                    <p>Our counsellors have helped 2,40,000+ students achieve their study abroad dreams. Get your free consultation today.</p>
                    <p style={{ color: '#7BFFC4', fontWeight: '700', fontSize: '16px', marginBottom: '20px' }}>
                        📱 24×7 Helpline: <a href="tel:+916356568111" style={{ color: '#fff', textDecoration: 'underline' }}>+91 6356 568111</a>
                    </p>
                    <div className="cta-btns">
                        <a href="tel:+916356568111" className="btn btn-orange btn-lg">📱 Call 24×7 Helpline</a>
                        <button className="btn btn-lg" style={{ background: '#25D366', borderColor: '#25D366', color: '#fff' }} onClick={() => window.open('https://wa.me/916356568111', '_blank')}>💬 WhatsApp 24×7</button>
                    </div>
                </div>
            </section>


            <footer className="footer" id="contact">
                <div className="container">
                    {/* Language Courses Row */}
                    <div style={{ marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid #dae5f0' }}>
                        <h4 style={{ fontSize: '15px', color: '#002D6B' }}>Language Courses In Vadodara</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                            <a href="#">Spoken English Classes in Vadodara</a>
                            <a href="#">French Classes in Vadodara</a>
                            <a href="#">German Classes in Vadodara</a>
                        </div>
                    </div>

                    <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                        {/* Popular Intakes */}
                        <div>
                            <h4>Popular Study Abroad Intake Blogs</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', fontSize: '13px' }}>
                                <a href="#">Intakes in Canada</a>
                                <a href="#">Winter Intake In Canada</a>
                                <a href="#">May Intake In Canada</a>
                                <a href="#">September intake in Canada</a>
                                <a href="#">Intakes in USA</a>
                                <a href="#">Spring intake in USA</a>
                                <a href="#">Fall Intake in USA</a>
                                <a href="#">Summer Intake in USA</a>
                                <a href="#">Intakes in UK</a>
                                <a href="#">January Intake In UK</a>
                                <a href="#">May Intake In UK</a>
                                <a href="#">September intake in UK</a>
                                <a href="#">Intakes in Australia</a>
                                <a href="#">February intake in Australia</a>
                                <a href="#">Intakes In Germany</a>
                                <a href="#">Summer Intake In Germany</a>
                                <a href="#">Winter intake in Germany</a>
                                <a href="#">Intakes In Ireland</a>
                                <a href="#">September Intake In Ireland</a>
                                <a href="#">January intake in Ireland</a>
                                <a href="#">Intakes in New Zealand</a>
                                <a href="#">November Intake In Australia</a>
                            </div>
                        </div>

                        {/* Featured Blogs */}
                        <div>
                            <h4>Featured Blogs</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', fontSize: '13px' }}>
                                <a href="#">IELTS</a>
                                <a href="#">PTE Resources</a>
                                <a href="#">IELTS Speaking Mock Test</a>
                                <a href="#">IELTS Eligibility</a>
                                <a href="#">PTE</a>
                                <a href="#">GRE</a>
                                <a href="#">IELTS Reading Answers</a>
                                <a href="#">IELTS Syllabus</a>
                                <a href="#">IELTS Resources</a>
                                <a href="#">IELTS General Reading PDF</a>
                                <a href="#">IELTS Reading PDF</a>
                                <a href="#">IELTS Listening Answers</a>
                                <a href="#">GRE Resources</a>
                            </div>
                        </div>

                        {/* Quick Links Column */}
                        <div>
                            <h4>Quick Links</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                                <a href="#">About</a>
                                <a href="#">Blog</a>
                                <a href="#">Contact Us</a>
                                <a href="#">Student Reviews</a>
                                <a href="#">Work with Us</a>
                                <div style={{ marginTop: '15px', fontWeight: '700', color: '#003399' }}>
                                    📱 +91 6356 568111
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <p style={{ marginRight: '10px' }}>Copyright © 2026 KANAN.CO All rights reserved.</p>
                            <a href="#" style={{ color: '#003399' }}>Refund Policy</a>
                            <a href="#" style={{ color: '#003399' }}>Privacy Policy</a>
                            <a href="#" style={{ color: '#003399' }}>Terms of Service</a>
                            <a href="#" style={{ color: '#003399' }}>Disclaimer</a>
                        </div>
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
            <a className="fab fab-wa" href="https://wa.me/916356568111" target="_blank" rel="noreferrer" title="WhatsApp 24×7 Helpline">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
            <a className="fab fab-call" href="tel:+916356568111" title="24×7 Helpline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
            </a>
        </div>
    );
}

export default Footer;
