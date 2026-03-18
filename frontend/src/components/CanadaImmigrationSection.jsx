import React from 'react';

function CanadaImmigrationSection({ onOpenCanadaBooking, onOpenRefusalBooking, onOpenGermanyBooking, onOpenVisitorBooking, onOpenCoachingBooking, onOpenTestPrepBooking, onOpenStudyBooking }) {
    return (
        <section className="immigration-section" id="expert-services">
            <div className="container">
                <div className="section-title-sm">
                    <h3>Explore Expertise</h3>
                    <h2>Our Specialist Services</h2>
                </div>

                <div className="expert-grid">
                    {/* BOX 1: Study in Canada */}
                    <div className="immigration-card" style={{ background: '#FFF1F2', borderColor: '#FECDD3' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#BE123C' }}>Study in Canada</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Your gateway to global education and Permanent Residence.
                                    Expert guidance for <strong>admissions in Public colleges & Universities</strong>, <strong>Visa</strong>, <strong>PGWP aligned program</strong> and <strong>PR ORIENTED PROGRAM</strong>
                                </p>
                                <button className="btn-book" style={{ background: '#E11D48' }} onClick={() => onOpenStudyBooking('Canada')}>
                                    Plan My Study
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#BE123C" strokeWidth="1">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                    <path d="M2 17l10 5 10-5"></path>
                                    <path d="M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 2: Study in USA */}
                    <div className="immigration-card" style={{ background: '#EFF6FF', borderColor: '#DBEAFE' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#1E40AF' }}>Study in USA</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Secure admission to top-ranked U.S. universities for <strong>Bachelor’s</strong>, <strong>Master’s</strong>, and <strong>funded PhD programs</strong>. Receive expert guidance on scholarships, application guidelines, and personalized visa assistance.
                                </p>
                                <button className="btn-book" style={{ background: '#2563EB' }} onClick={() => onOpenStudyBooking('USA')}>
                                    Start Application
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" strokeWidth="1">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2v20M2 12h20"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 3: Study in UK */}
                    <div className="immigration-card" style={{ background: '#F5F3FF', borderColor: '#EDE9FE' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#5B21B6' }}>Study in UK</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Heritage and excellence. Fast-track 1-year Masters, <strong>No IELTS options</strong>, and <strong>Post-Study Work (PSW)</strong> guidance for top UK institutions.
                                </p>
                                <button className="btn-book" style={{ background: '#7C3AED' }} onClick={() => onOpenStudyBooking('UK')}>
                                    Get Admission
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 4: Study in Australia */}
                    <div className="immigration-card" style={{ background: '#F0FDF4', borderColor: '#DCFCE7' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#166534' }}>Study in Australia</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Quality life and education. Expert help for <strong>Group of Eight</strong> universities, <strong>Level 1 providers</strong>, and professional year guidance.
                                </p>
                                <button className="btn-book" style={{ background: '#16A34A' }} onClick={() => onOpenStudyBooking('Australia')}>
                                    Explore Courses
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="1">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 6l-1 5-5 1 5 1 1 5 1-5 5-1-5-1-1-5z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 5: Study in Dubai */}
                    <div className="immigration-card" style={{ background: '#FFFBEB', borderColor: '#FEF3C7' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#92400E' }}>Study in Dubai</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Modern education hub. <strong>No IELTS</strong>, <strong>No Funds</strong>, <strong>Low Budget</strong>, and <strong>Pathway to Canada, UK, USA And Australia</strong>. Earn while you learn with flexible work rights.
                                </p>
                                <button className="btn-book" style={{ background: '#D97706' }} onClick={() => onOpenStudyBooking('Dubai')}>
                                    Apply Now
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="1">
                                    <path d="M3 21h18M3 7l9-4 9 4v14H3V7z"></path>
                                    <path d="M9 21V11h6v10"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 6: Study in Europe */}
                    <div className="immigration-card" style={{ background: '#ECFEFF', borderColor: '#CFFAFE' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#155E75' }}>Study in Europe</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Experience world-class European education. Expert guidance for <strong>Ireland, France, Finland, Italy, Lithuania, Hungary, Belgium</strong>, and <strong>Denmark</strong>. Affordable tuition, Schengen visa assistance, and strong post-study work opportunities.
                                </p>
                                <button className="btn-book" style={{ background: '#0891B2' }} onClick={() => onOpenStudyBooking('Europe')}>
                                    Start Journey
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#155E75" strokeWidth="1">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M2 12h20"></path>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 7: Study MBBS Abroad */}
                    <div className="immigration-card" style={{ background: '#FFF5F5', borderColor: '#FFE4E6' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#991B1B' }}>Study MBBS Abroad</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Study in Mbbs at top university globaly
                                </p>
                                <button className="btn-book" style={{ background: '#DC2626' }} onClick={() => onOpenStudyBooking('MBBS')}>
                                    Medical Admission
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                    <path d="M12 11v7M10 13h4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 8: Germany Admission */}
                    <div className="immigration-card" style={{ background: '#F8F5FF', borderColor: '#E8E0FF' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#4B0082' }}>Get Free Education in Germany</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Complete guidance for: <strong>Admission in Public Universities</strong> • <strong>Admission in Private Universities</strong>
                                </p>
                                <button className="btn-book" style={{ background: '#7B2FF7' }} onClick={onOpenGermanyBooking}>
                                    Book Consultation
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#4B0082" strokeWidth="1">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                    <path d="M2 17l10 5 10-5"></path>
                                    <path d="M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 9: Canada Immigration */}
                    <div className="immigration-card" style={{ background: '#F0F7FF', borderColor: '#D0E3FF' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#003399' }}>Canada Immigration & PR</h2>
                                <p className="sub-text">
                                    Simplifying your journey through Express Entry, PNP, and PR pathways.
                                    End-to-end support from profile evaluation to successful PR approval.
                                    Our experts ensure a smooth and strategic immigration process.
                                </p>
                                <button className="btn-book" onClick={onOpenCanadaBooking} style={{ background: '#0052CC' }}>
                                    Book Consultation
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="1">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 10: Visitor Visa */}
                    <div className="immigration-card" style={{ background: '#FDF2F8', borderColor: '#FBCFE8' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#9D174D' }}>Visitor Visa</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Expert assistance for hassle-free visitor visa applications. Invite your friends and family with complete end-to-end support.
                                </p>
                                <button className="btn-book" style={{ background: '#DB2777' }} onClick={onOpenVisitorBooking}>
                                    Book Consultation
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#9D174D" strokeWidth="1">
                                    <rect x="3" y="7" width="18" height="13" rx="2"></rect>
                                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 11: Language Courses */}
                    <div className="immigration-card" style={{ background: '#EFF6FF', borderColor: '#BFDBFE' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#1E40AF' }}>Language Courses</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Master a new language with our expert coaching for: <strong>English</strong> • <strong>French</strong> • <strong>German</strong>. Tailored programs for all levels.
                                </p>
                                <button className="btn-book" style={{ background: '#2563EB' }} onClick={onOpenCoachingBooking}>
                                    Join Course
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" strokeWidth="1">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 12: English Proficiency Tests */}
                    <div className="immigration-card" style={{ background: '#ECFDF5', borderColor: '#D1FAE5' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#065F46' }}>English Proficiency Tests</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Expert coaching to ace your: <strong>IELTS</strong> • <strong>PTE</strong> • <strong>Duolingo</strong> • <strong>TOEFL</strong>. High-score strategies.
                                </p>
                                <button className="btn-book" style={{ background: '#059669' }} onClick={onOpenTestPrepBooking}>
                                    Start Prep
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#065F46" strokeWidth="1">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 13: Academic Entrance Tests */}
                    <div className="immigration-card" style={{ background: '#FFF7ED', borderColor: '#FFEDD5' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#9A3412' }}>Academic Entrance Tests</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Excel in global entrance exams: <strong>SAT</strong> • <strong>GRE</strong> • <strong>GMAT</strong>. Proven methods for top university admissions.
                                </p>
                                <button className="btn-book" style={{ background: '#EA580C' }} onClick={onOpenTestPrepBooking}>
                                    Learn More
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#9A3412" strokeWidth="1">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 14: Travel Ticketing */}
                    <div className="immigration-card" style={{ background: '#F0FFF8', borderColor: '#D0F7E8' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#006644' }}>International and Domestic Travel Ticketing</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Hassle-free booking for flight tickets.
                                    We offer competitive rates and specialized student travel support.
                                </p>
                                <a href="https://travelwithkanan.com/" target="_blank" rel="noreferrer" className="btn-book" style={{ background: '#00B368', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    VIEW PORTAL
                                </a>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#006644" strokeWidth="1">
                                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1.1.1-1.3.5l-.3.4c-.2.5-.2 1.1.1 1.5L9 12l-3.3 3.3-2.1-.7c-.5-.2-1.1 0-1.5.3l-.3.3c-.4.4-.4 1 0 1.4l2.2 2.2 2.2 2.2c.4.4 1 .4 1.4 0l.3-.3c.3-.4.5-1 .3-1.5l-.7-2.1L12 15l3.4 5.7c.4.3 1 .3 1.5.1l.4-.3c.4-.2.6-.8.5-1.3z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 15: Visa Refusal Cases */}
                    <div className="immigration-card" style={{ background: '#FFF8F0', borderColor: '#FFE9D0' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#855100' }}>Expert Opinion on Visa Refusal Cases</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Specialized support for: <strong>Student Visa</strong> • <strong>Visitor Visa</strong> • <strong>Spouse Visa</strong> • <strong>PR (Permanent Residency)</strong>
                                </p>
                                <button className="btn-book" style={{ background: '#FF6B00' }} onClick={onOpenRefusalBooking}>
                                    Get Expert Opinion
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#855100" strokeWidth="1">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 16: Post Visa Services */}
                    <div className="immigration-card" style={{ background: '#F0FDFA', borderColor: '#CCFBF1' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#0F766E' }}>Post Visa Services</h2>
                                <p className="sub-text" style={{ color: '#475569' }}>
                                    Comprehensive support after your visa approval: <strong>Education Loan</strong> • <strong>Ticketing</strong> • <strong>Forex</strong> • <strong>VSA</strong>
                                </p>
                                <button className="btn-book" style={{ background: '#0D9488' }} onClick={onOpenCanadaBooking}>
                                    Avail Services
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CanadaImmigrationSection;
