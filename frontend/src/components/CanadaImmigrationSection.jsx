import React from 'react';

function CanadaImmigrationSection({ 
    onOpenCanadaBooking, 
    onOpenRefusalBooking, 
    onOpenGermanyBooking, 
    onOpenVisitorBooking, 
    onOpenCoachingBooking, 
    onOpenTestPrepBooking, 
    onOpenStudyBooking 
}) {
    return (
        <section className="immigration-section" id="expert-services">
            <div className="container">
                <div className="section-title-sm">
                    <h3>Premium Expertise</h3>
                    <h2>Our Specialist Services</h2>
                    <p style={{ color: '#64748b', marginTop: '16px', fontSize: '18px' }}>Empowering your global ambitions with certified counselling and end-to-end support.</p>
                </div>

                <div className="expert-grid">
                    {/* BOX 1: Study in Canada */}
                    <div className="immigration-card" style={{ background: '#FFF1F2', borderColor: '#FECDD3' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#BE123C' }}>Study in Canada</h2>
                                <p className="sub-text">
                                    Your gateway to global education and Permanent Residence. Expert guidance for admissions in <strong>Public colleges & Universities</strong>, Visa, PGWP aligned program and PR ORIENTED PROGRAM.
                                </p>
                                <button className="btn-book" style={{ background: '#E11D48' }} onClick={() => onOpenStudyBooking('Canada')}>
                                    PLAN MY STUDY
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#BE123C" strokeWidth="1">
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
                                <p className="sub-text">
                                    Secure admission to top-ranked U.S. universities for <strong>Bachelor’s, Master’s, and funded PhD</strong> programs. Receive expert guidance on scholarships, application guidelines, and personalized visa assistance.
                                </p>
                                <button className="btn-book" style={{ background: '#2563EB' }} onClick={() => onOpenStudyBooking('USA')}>
                                    START APPLICATION
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" strokeWidth="1">
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
                                <p className="sub-text">
                                    Heritage and excellence. Fast-track <strong>1-year Masters, No IELTS options</strong>, and Post-Study Work (PSW) guidance for top UK institutions.
                                </p>
                                <button className="btn-book" style={{ background: '#7C3AED' }} onClick={() => onOpenStudyBooking('UK')}>
                                    GET ADMISSION
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1">
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
                                <p className="sub-text">
                                    Quality life and education. Expert help for <strong>Group of Eight</strong> universities, Level 1 providers, and professional year guidance.
                                </p>
                                <button className="btn-book" style={{ background: '#16A34A' }} onClick={() => onOpenStudyBooking('Australia')}>
                                    EXPLORE COURSES
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="1">
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
                                <p className="sub-text">
                                    Modern education hub. <strong>No IELTS, No Funds, Low Budget</strong>, and Pathway to Canada, UK, USA and Australia. Earn while you learn with flexible work rights.
                                </p>
                                <button className="btn-book" style={{ background: '#D97706' }} onClick={() => onOpenStudyBooking('Dubai')}>
                                    APPLY NOW
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="1">
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
                                <p className="sub-text">
                                    Experience world-class European education. Expert guidance for <strong>Ireland, France, Finland, Italy, Lithuania, Hungary, Belgium, and Denmark</strong>. Affordable tuition, Schengen visa assistance, and strong post-study work opportunities.
                                </p>
                                <button className="btn-book" style={{ background: '#0891B2' }} onClick={() => onOpenStudyBooking('Europe')}>
                                    START JOURNEY
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#155E75" strokeWidth="1">
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
                                <p className="sub-text">
                                    Start your journey to becoming a globally recognised doctor with affordable tuition fees and <strong>NMC-approved</strong> medical degrees, opening doors to international medical careers and global opportunities.
                                </p>
                                <button className="btn-book" style={{ background: '#DC2626' }} onClick={() => onOpenStudyBooking('MBBS')}>
                                    MEDICAL ADMISSION
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="1">
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
                                <p className="sub-text">
                                    Complete guidance for: Admission in <strong>Public Universities</strong> &bull; Admission in <strong>Private Universities</strong>.
                                </p>
                                <button className="btn-book" style={{ background: '#7B2FF7' }} onClick={onOpenGermanyBooking}>
                                    BOOK CONSULTATION
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#4B0082" strokeWidth="1">
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
                                    Simplifying your journey through <strong>Express Entry, PNP, and PR</strong> pathways. End-to-end support from profile evaluation to successful PR approval. Our experts ensure a smooth and strategic immigration process.
                                </p>
                                <button className="btn-book" onClick={onOpenCanadaBooking} style={{ background: '#0052CC' }}>
                                    PROFILE EVALUATION
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="1">
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
                                <p className="sub-text">
                                    Expert assistance for hassle-free visitor visa applications. Invite your friends and family with complete end-to-end support.
                                </p>
                                <button className="btn-book" style={{ background: '#DB2777' }} onClick={onOpenVisitorBooking}>
                                    GET VISA NOW
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#9D174D" strokeWidth="1">
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
                                <p className="sub-text">
                                    Master a new language with our expert coaching for: <strong>English &bull; French &bull; German</strong>. Tailored programs for all levels.
                                </p>
                                <button className="btn-book" style={{ background: '#2563EB' }} onClick={onOpenCoachingBooking}>
                                    Join Training
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" strokeWidth="1">
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
                                <p className="sub-text">
                                    Expert coaching to ace your: <strong>IELTS &bull; PTE &bull; Duolingo &bull; TOEFL</strong>. High-score strategies.
                                </p>
                                <button className="btn-book" style={{ background: '#059669' }} onClick={onOpenTestPrepBooking}>
                                    Start Prep
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#065F46" strokeWidth="1">
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
                                <p className="sub-text">
                                    Excel in global entrance exams: <strong>SAT &bull; GRE &bull; GMAT</strong>. Proven methods for top university admissions.
                                </p>
                                <button className="btn-book" style={{ background: '#EA580C' }} onClick={onOpenTestPrepBooking}>
                                    Learn More
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#9A3412" strokeWidth="1">
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
                                <p className="sub-text">
                                    Hassle-free booking for flight tickets. We offer competitive rates and specialized student travel support.
                                </p>
                                <a href="https://travelwithkanan.com/" target="_blank" rel="noreferrer" className="btn-book" style={{ background: '#00B368', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    VIEW PORTAL
                                </a>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#006644" strokeWidth="1">
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
                                <p className="sub-text">
                                    Specialized support for: <strong>Student Visa &bull; Visitor Visa &bull; Spouse Visa &bull; PR (Permanent Residency)</strong>.
                                </p>
                                <button className="btn-book" style={{ background: '#FF6B00' }} onClick={onOpenRefusalBooking}>
                                    Expert Opinion
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#855100" strokeWidth="1">
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
                                <p className="sub-text">
                                    Comprehensive support after your visa approval: <strong>Education Loan &bull; Ticketing &bull; Forex &bull; VSA</strong>.
                                </p>
                                <button className="btn-book" style={{ background: '#0D9488' }} onClick={() => onOpenCanadaBooking}>
                                    Avail Support
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 17: Psychometric Assessment Test */}
                    <div className="immigration-card" style={{ background: '#F5F3FF', borderColor: '#DDD6FE' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#4C1D95' }}>Psychometric Test</h2>
                                <p className="sub-text">
                                    Identify your ideal career path with our scientific mapping to align strengths with global opportunities.
                                </p>
                                <button className="btn-book" style={{ background: '#6D28D9' }} onClick={onOpenCoachingBooking}>
                                    BOOK MY TEST
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#4C1D95" strokeWidth="1">
                                    <path d="M9 18h6" />
                                    <path d="M10 22h4" />
                                    <path d="M12 2a7 7 0 0 0-7 7c0 2.32 1.04 4.39 2.66 5.82L8.5 18h7l.84-3.18A7.05 7.05 0 0 0 19 9a7 7 0 0 0-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* BOX 18: Career Talk Show */}
                    <div className="immigration-card" style={{ background: '#F0F9FF', borderColor: '#BAE6FD' }}>
                        <div className="immigration-card-inner">
                            <div className="immigration-content">
                                <h2 style={{ color: '#0369A1' }}>Career Talk Show</h2>
                                <p className="sub-text">
                                    Join our exclusive seminars and interactive sessions with industry experts to gain deep insights into global <strong>market trends, emerging careers</strong>, and networking.
                                </p>
                                <button className="btn-book" style={{ background: '#0284C7' }} onClick={onOpenCoachingBooking}>
                                    JOIN SESSION
                                </button>
                            </div>
                            <div className="immigration-bg-icon">
                                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="1">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    <polygon points="11 7 16 12 11 17 11 7"></polygon>
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
