import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';
import { RegisterModal, CallbackModal, SuccessModal } from '../components/Modals';
import { InviteModal } from '../components/InviteModal';
import { VcardModal } from '../components/VcardModal';
import { BookingModal } from '../components/BookingModal';
import CanadaImmigrationSection from '../components/CanadaImmigrationSection';

const TYPE_FILTERS = [
    { key: 'all', label: 'All Events' },
    { key: 'visa-fair', label: 'Kanan Student Visa Fair' },
    { key: 'seminar', label: 'Seminars' },
    { key: 'workshop', label: 'Workshops' },
    { key: 'ptm', label: 'Parents–Teacher Meets' },
    { key: 'education-expo', label: 'Abroad Education Expo' },
    { key: 'mock-test', label: 'Kanan Mega Mock Test Drive' },
    { key: 'ceremony', label: 'Certification Ceremony' },
    { key: 'other', label: 'Other' }
];

function Calendar() {
    const [eventsData, setEventsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Modals
    const [registerEvent, setRegisterEvent] = useState(null);
    const [callbackOpen, setCallbackOpen] = useState(false);
    const [inviteData, setInviteData] = useState(null);
    const [successData, setSuccessData] = useState(null);
    const [vcardLeader, setVcardLeader] = useState(null);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [isCanadaBooking, setIsCanadaBooking] = useState(false);
    const [isRefusalBooking, setIsRefusalBooking] = useState(false);
    const [isGermanyBooking, setIsGermanyBooking] = useState(false);
    const [isVisitorBooking, setIsVisitorBooking] = useState(false);
    const [isCoachingBooking, setIsCoachingBooking] = useState(false);
    const [isTestPrepBooking, setIsTestPrepBooking] = useState(false);
    const [studyCountry, setStudyCountry] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/api/events?activeOnly=true`)
            .then(res => { if (res.data.success) setEventsData(res.data.data); })
            .catch(err => console.error('Error fetching events:', err));
    }, []);

    const filteredEvents = useMemo(() => {
        return eventsData.filter(e => {
            // Category Filter
            if (activeFilter !== 'all') {
                const standardKeys = TYPE_FILTERS.map(f => f.key).filter(k => k !== 'all' && k !== 'other');
                const eventType = (e.type || '').toLowerCase();
                
                if (activeFilter === 'other') {
                    // Show if it doesn't match any known standard key
                    if (standardKeys.includes(eventType)) return false;
                } else {
                    // Standard filter (case-insensitive)
                    if (eventType !== activeFilter.toLowerCase()) return false;
                }
            }

            // Search Filter
            if (searchTerm) {
                const q = searchTerm.toLowerCase();
                const tagsStr = (e.tags || []).map(t => typeof t === 'object' ? t.label : t).join(' ');
                const hay = `${e.title || ''} ${e.type || ''} ${e.subtitle || ''} ${e.activity || ''} ${e.searchKeys || ''} ${e.teamLead || e.leadName || ''} ${e.country || ''} ${e.branch || e.venue || ''} ${e.dept || ''} ${e.day || ''} ${e.mainEvent || ''} ${tagsStr}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [eventsData, activeFilter, searchTerm]);

    // Helper to build date display strings from event data
    const enrichEvent = (ev) => {
        let dateNum = ev.dateDayStr, dateMonStr = ev.dateMonthStr;
        if (!dateNum && ev.date) {
            const parts = ev.date.split('/');
            if (parts.length >= 2) { dateNum = parts[0]; dateMonStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(parts[1], 10) - 1] || 'MAR'; }
        }
        return { ...ev, dateDayStr: dateNum, dateMonthStr: dateMonStr };
    };

    return (
        <>
            {/* NAVBAR */}
            <Navbar onOpenCallback={() => setCallbackOpen(true)} onOpenBooking={() => setBookingOpen(true)} />

            {/* HERO */}
            <Hero onOpenBooking={() => setBookingOpen(true)} onOpenRegister={setRegisterEvent} onOpenInvite={setInviteData} />

            {/* MONTH/TYPE FILTER NAV */}
            <div className="month-nav">
                <div className="container">
                    <div className="month-tabs">
                        {TYPE_FILTERS.map(f => (
                            <button
                                key={f.key}
                                className={`month-tab${activeFilter === f.key ? ' active' : ''}`}
                                onClick={() => setActiveFilter(f.key)}
                            >{f.label}</button>
                        ))}
                    </div>
                    <div className="filter-group">
                        <div className="search-wrap">
                            <span className="search-icon">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* EVENTS */}
            <section className="events-section">
                <div className="container">
                    <div className="section-head">
                        <h2>Upcoming Events</h2>
                        <span className="event-count">{filteredEvents.length} events</span>
                    </div>
                    {filteredEvents.length > 0 ? (
                        <div className="events-grid">
                            {filteredEvents.map((ev, idx) => (
                                <EventCard
                                    key={ev.id || idx}
                                    event={enrichEvent(ev)}
                                    onOpenRegister={() => setRegisterEvent(ev)}
                                    onOpenInvite={() => setInviteData(ev)}
                                    onOpenVcard={(name) => setVcardLeader(name)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                            <h3>No events found</h3>
                            <p>Try a different search term or filter.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CANADA, REFUSAL & GERMANY SECTIONS */}
            <CanadaImmigrationSection
                onOpenCanadaBooking={() => { setIsCanadaBooking(true); setBookingOpen(true); }}
                onOpenRefusalBooking={() => { setIsRefusalBooking(true); setBookingOpen(true); }}
                onOpenGermanyBooking={() => { setIsGermanyBooking(true); setBookingOpen(true); }}
                onOpenVisitorBooking={() => { setIsVisitorBooking(true); setBookingOpen(true); }}
                onOpenCoachingBooking={() => { setIsCoachingBooking(true); setBookingOpen(true); }}
                onOpenTestPrepBooking={() => { setIsTestPrepBooking(true); setBookingOpen(true); }}
                onOpenStudyBooking={(country) => { setStudyCountry(country); setBookingOpen(true); }}
            />

            {/* FOOTER */}
            <Footer />

            {/* MODALS */}
            <RegisterModal
                isOpen={!!registerEvent}
                eventDetails={registerEvent ? {
                    title: registerEvent.title || registerEvent.activity,
                    venue: registerEvent.venue || registerEvent.branch,
                    date: registerEvent.date,
                    time: registerEvent.time
                } : null}
                onClose={() => setRegisterEvent(null)}
                onSuccess={(name, type) => {
                    const ev = registerEvent;
                    setRegisterEvent(null);
                    setSuccessData({
                        title: 'Registration Successful!',
                        message: `Thank you, <strong>${name}</strong>! You're registered as a ${type === 'kanan' ? '<span style="background:#E8F1FF;color:#0052CC;padding:2px 8px;border-radius:10px;font-size:12px;font-weight:700;">Kanan Student</span>' : '<span style="background:#FFF0E0;color:#FF6B00;padding:2px 8px;border-radius:10px;font-size:12px;font-weight:700;">Outside Student</span>'}.<br/><br/>Our team will confirm within 24 hours.<br/><span style="color:#00B368;font-weight:700;">📱 24×7: +91 6356 568111</span>`,
                        showInvite: true,
                        eventForInvite: ev
                    });
                }}
            />
            <CallbackModal
                isOpen={callbackOpen}
                onClose={() => setCallbackOpen(false)}
                onSuccess={() => { setCallbackOpen(false); setSuccessData({ title: 'Callback Requested!', message: "We'll contact you shortly.<br/><span style='color:#00B368;font-weight:700;'>📱 24×7: +91 6356 568111</span>" }); }}
            />
            {inviteData && (
                <InviteModal
                    isOpen={true}
                    inviteData={typeof inviteData === 'object' && !inviteData.date ? {
                        title: inviteData.title || inviteData.activity,
                        venue: inviteData.venue || inviteData.branch,
                        date: `${inviteData.dateDayStr || ''} ${inviteData.dateMonthStr || ''} 2026`,
                        time: inviteData.time,
                        type: inviteData.type,
                        countries: (inviteData.tags || []).map(t => typeof t === 'object' ? t.label : t).join(' • '),
                        activities: inviteData.activities
                    } : inviteData}
                    onClose={() => setInviteData(null)}
                />
            )}
            {successData && (
                <SuccessModal
                    isOpen={true}
                    title={successData.title}
                    message={successData.message}
                    showInviteBtn={!!successData.showInvite}
                    onClose={() => setSuccessData(null)}
                    onOpenInvite={successData.eventForInvite ? () => { setSuccessData(null); setInviteData(successData.eventForInvite); } : null}
                />
            )}
            <VcardModal
                isOpen={!!vcardLeader}
                leaderName={vcardLeader}
                onClose={() => setVcardLeader(null)}
            />
            <BookingModal
                isOpen={bookingOpen}
                onClose={() => { 
                    setBookingOpen(false); 
                    setIsCanadaBooking(false); 
                    setIsRefusalBooking(false); 
                    setIsGermanyBooking(false); 
                    setIsVisitorBooking(false); 
                    setIsCoachingBooking(false);
                    setIsTestPrepBooking(false);
                    setStudyCountry("");
                }}
                canadaOnly={isCanadaBooking || isRefusalBooking || isVisitorBooking || studyCountry === 'Canada'}
                refusalOnly={isRefusalBooking}
                germanyOnly={isGermanyBooking || studyCountry === 'Germany'}
                visitorOnly={isVisitorBooking}
                coachingOnly={isCoachingBooking}
                testPrepOnly={isTestPrepBooking}
                studyCountry={studyCountry}
            />
        </>
    );
}

export default Calendar;
