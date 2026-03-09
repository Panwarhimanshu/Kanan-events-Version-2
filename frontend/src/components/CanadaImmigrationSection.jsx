import React from 'react';

function CanadaImmigrationSection({ onOpenBooking }) {
    return (
        <section className="immigration-section" id="immigration">
            <div className="container">
                <div className="immigration-card">
                    <div className="immigration-card-inner">
                        <div className="immigration-content">
                            <span className="badge-new">EXPERT GUIDE</span>
                            <h2>How to Get an Immigration <em>Visa in Canada</em></h2>
                            <p className="sub-text">Navigating Canadian immigration can be complex. From Express Entry to PNP, we're here to guide you every step of the way.</p>

                            <div className="visa-steps">
                                <div className="visa-step">
                                    <div className="step-num">01</div>
                                    <div className="step-info">
                                        <h4>Express Entry</h4>
                                        <p>The fastest way for skilled workers who want to live and work in Canada permanently.</p>
                                    </div>
                                </div>
                                <div className="visa-step">
                                    <div className="step-num">02</div>
                                    <div className="step-info">
                                        <h4>Provincial Nominee (PNP)</h4>
                                        <p>Each province has its own immigration streams for regions across the country.</p>
                                    </div>
                                </div>
                                <div className="visa-step">
                                    <div className="step-num">03</div>
                                    <div className="step-info">
                                        <h4>Study-to-PR Path</h4>
                                        <p>Turn your education into a permanent residence with our strategic planning.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '32px' }}>
                                <button className="btn btn-orange btn-lg" onClick={onOpenBooking}>
                                    Book Free counselling
                                </button>
                            </div>
                        </div>

                        <div className="immigration-image">
                            {/* The generated image would be used here in a real production environment or if I could reference it directly. I'll use a styled div with a flag icon for now. */}
                            <div className="map-bg">
                                <span className="flag-emoji">🇨🇦</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CanadaImmigrationSection;
