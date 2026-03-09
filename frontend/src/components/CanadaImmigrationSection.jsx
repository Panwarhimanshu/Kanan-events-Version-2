import React from 'react';

function CanadaImmigrationSection({ onOpenBooking }) {
    return (
        <section className="immigration-section" id="immigration">
            <div className="container">
                <div className="immigration-card">
                    <div className="immigration-card-inner">
                        <div className="immigration-content">
                            <h2>How to Get an Immigration Visa in Canada</h2>
                            <p className="sub-text">
                                Get expert guidance on Express Entry, PNP, and Study-to-PR paths.
                                Our certified consultants help you navigate the complex Canadian immigration process
                                to achieve your dream of living and working in Canada.
                            </p>

                            <button className="btn-book" onClick={onOpenBooking}>
                                Book Free counselling
                            </button>
                        </div>

                        <div className="immigration-bg-icon">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CanadaImmigrationSection;
