import React from 'react';

function CanadaImmigrationSection({ onOpenCanadaBooking, onOpenRefusalBooking, onOpenGermanyBooking }) {
    return (
        <section className="immigration-section" id="immigration">
            <div className="container">
                {/* BOX 1: Canada Immigration */}
                <div className="immigration-card">
                    <div className="immigration-card-inner">
                        <div className="immigration-content">
                            <h2>How to Get an Immigration Visa in Canada</h2>
                            <p className="sub-text">
                                Get expert guidance on Express Entry, PNP, and Study-to-PR paths.
                                Our certified consultants help you navigate the complex Canadian immigration process.
                            </p>
                            <button className="btn-book" onClick={onOpenCanadaBooking}>
                                Book Free counselling
                            </button>
                        </div>
                        <div className="immigration-bg-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="1">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* BOX 2: Visa Refusal Cases */}
                <div className="immigration-card" style={{ background: '#fff9f0', borderColor: '#ffe9d0' }}>
                    <div className="immigration-card-inner">
                        <div className="immigration-content">
                            <h2 style={{ color: '#855100' }}>Expert Opinion on Visa Refusal Cases</h2>
                            <p className="sub-text" style={{ color: '#855100' }}>
                                Specialized support for: <strong>Student Visa</strong> • <strong>Visitor Visa</strong> • <strong>Spouse Visa</strong> • <strong>PR (Permanent Residency)</strong>
                            </p>
                            <button className="btn-book" style={{ background: '#e67e22' }} onClick={onOpenRefusalBooking}>
                                Get Expert Opinion
                            </button>
                        </div>
                        <div className="immigration-bg-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#855100" strokeWidth="1">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* BOX 3: Germany Admission */}
                <div className="immigration-card" style={{ background: '#f5f0ff', borderColor: '#e0d0ff' }}>
                    <div className="immigration-card-inner">
                        <div className="immigration-content">
                            <h2 style={{ color: '#4B0082' }}>Get Germany Admission Information</h2>
                            <p className="sub-text" style={{ color: '#4B0082' }}>
                                Complete guidance for: <strong>Admission in Public Universities</strong> • <strong>Admission in Private Universities</strong>
                            </p>
                            <button className="btn-book" style={{ background: '#7B2FF7' }} onClick={onOpenGermanyBooking}>
                                Book Free counselling
                            </button>
                        </div>
                        <div className="immigration-bg-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4B0082" strokeWidth="1">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* BOX 4: Travel Ticketing */}
                <div className="immigration-card" style={{ background: '#e0fff0', borderColor: '#c0f7e0' }}>
                    <div className="immigration-card-inner">
                        <div className="immigration-content">
                            <h2 style={{ color: '#006644' }}>International and Domestic Travel Ticketing</h2>
                            <p className="sub-text" style={{ color: '#006644' }}>
                                Hassle-free booking for your study abroad flight tickets.
                                We offer competitive rates and specialized student travel support.
                            </p>
                            <a href="https://travelwithkanan.com/" target="_blank" rel="noreferrer" className="btn-book" style={{ background: '#00b368', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                VIEW NOW
                            </a>
                        </div>
                        <div className="immigration-bg-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#006644" strokeWidth="1">
                                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1.1.1-1.3.5l-.3.4c-.2.5-.2 1.1.1 1.5L9 12l-3.3 3.3-2.1-.7c-.5-.2-1.1 0-1.5.3l-.3.3c-.4.4-.4 1 0 1.4l2.2 2.2 2.2 2.2c.4.4 1 .4 1.4 0l.3-.3c.3-.4.5-1 .3-1.5l-.7-2.1L12 15l3.4 5.7c.4.3 1 .3 1.5.1l.4-.3c.4-.2.6-.8.5-1.3z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CanadaImmigrationSection;
