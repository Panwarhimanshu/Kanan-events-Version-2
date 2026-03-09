import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import API_URL from '../config/api';
import './AdminDashboard.css';

function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [isLogged, setIsLogged] = useState(() => sessionStorage.getItem('adminLoggedIn') === 'true');
    const [userRole, setUserRole] = useState(() => sessionStorage.getItem('userRole') || 'admin');
    const [username, setUsername] = useState(() => sessionStorage.getItem('username') || '');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('events');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const downloadSampleCSV = () => {
        const headers = ["Main Event", "Activities", "Team Leader", "Contact Number", "2nd Member", "Department", "Branch", "Month", "Time", "Date"];
        const sampleRow = ["Seminar on Study Abroad", "Presentation, Q&A session", "Anil Goel", "+91 63590 75555", "Sagar Pokhrel", "Canada Admissions", "Kanan House, Vadodara", "March", "11:00 AM", "2024-03-15"];
        const csvContent = headers.join(",") + "\n" + sampleRow.join(",");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "events_import_sample.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ── Users Management (Super Admin only) ──────────────
    const [users, setUsers] = useState([]);
    const [userForm, setUserForm] = useState({ id: null, username: '', password: '', role: 'admin' });
    const [editingUser, setEditingUser] = useState(false);

    // ── Registrations state ──────────────────────────────
    const [registrations, setRegistrations] = useState([]);
    const [regFilter, setRegFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    // ── Callbacks & Interests state ──────────────────────
    const [callbacks, setCallbacks] = useState([]);
    const [interests, setInterests] = useState([]);
    const [newInterest, setNewInterest] = useState('');

    // ── HODs state ────────────────────────────────────────
    const [hods, setHods] = useState([]);
    const [hodForm, setHodForm] = useState({ id: null, name: '', designation: '', department: '', phone: '', email: '', branch: '', initials: '', color: '#0052CC', vcard_image: null });
    const [editingHod, setEditingHod] = useState(false);
    const [hodSearch, setHodSearch] = useState('');

    // ── Counselling state ─────────────────────────────────
    const [counsellings, setCounsellings] = useState([]);
    const [counsellingForm, setCounsellingForm] = useState({ id: null, name: '', mobile: '', preferred_country: '', assigned_counselor: '', status: 'Pending', notes: '' });
    const [editingCounselling, setEditingCounselling] = useState(false);
    const [counsellingSearch, setCounsellingSearch] = useState('');

    // ── Events form state ────────────────────────────────
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: null, month: 'march', type: 'seminar', ribbonColor: '', customType: '',
        dateDayStr: '', dateMonthStr: '', title: '', subtitle: '',
        venue: '', time: '', isOnline: false, activitiesLabel: 'Activities',
        activities: '', searchKeys: '', is_active: true, is_featured: false, tags: [], teamLead: ''
    });

    const [customTagInput, setCustomTagInput] = useState('');

    const AVAILABLE_TAGS = [
        { id: 'canada', label: 'Canada', colorClass: 't-canada' },
        { id: 'uk', label: 'UK', colorClass: 't-uk' },
        { id: 'usa', label: 'USA', colorClass: 't-usa' },
        { id: 'australia', label: 'Australia', colorClass: 't-australia' },
        { id: 'germany', label: 'Germany', colorClass: 't-germany' },
        { id: 'ireland', label: 'Ireland', colorClass: 't-ireland' },
        { id: 'dubai', label: 'Dubai', colorClass: 't-dubai' },
        { id: 'new-zealand', label: 'New Zealand', colorClass: 't-australia' },
        { id: 'europe', label: 'Europe', colorClass: 't-germany' },
        { id: 'singapore', label: 'Singapore', colorClass: 't-dubai' },
        { id: 'ielts', label: 'IELTS', colorClass: 't-coaching' },
        { id: 'pte', label: 'PTE', colorClass: 't-coaching' },
        { id: 'scholarship', label: 'Scholarships', colorClass: 't-canada' },
        { id: 'visa', label: 'Visa Guidance', colorClass: 't-uk' },
        { id: 'student-visa', label: 'Student Visa', colorClass: 't-canada' },
        { id: 'visitor-visa', label: 'Visitor Visa', colorClass: 't-usa' },
        { id: 'spouse-visa', label: 'Spouse Visa', colorClass: 't-uk' },
        { id: 'pr', label: 'PR (Permanent Residency)', colorClass: 't-australia' }
    ];

    const allTags = [
        ...AVAILABLE_TAGS,
        ...formData.tags.filter(ft => !AVAILABLE_TAGS.some(at => at.id === ft.id))
    ];

    const EVENT_CATEGORIES = [
        { id: 'visa-fair', label: 'Kanan Student Visa Fair' },
        { id: 'education-expo', label: 'Abroad Education Expo' },
        { id: 'mock-test', label: 'Mega Mock Test Drive' },
        { id: 'ptm', label: 'Parents–Teacher Meets' },
        { id: 'immigration-canada', label: 'How to Get an Immigration Visa in Canada' },
        { id: 'visa-refusal', label: 'Expert Opinion on Visa Refusal Cases' },
        { id: 'ceremony', label: 'Certification Ceremony' },
        { id: 'seminar', label: 'Seminar' },
        { id: 'other', label: 'Other (Custom)' }
    ];

    useEffect(() => {
        if (isLogged) {
            fetchEvents();
            fetchRegistrations();
            fetchCallbacks();
            fetchInterests();
            if (userRole === 'super_admin') {
                fetchHods();
                fetchUsers();
            }
            fetchCounsellings();
        }
    }, [isLogged]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/users`);
            if (res.data.success) setUsers(res.data.data);
        } catch (err) { console.error(err); }
    };

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            if (userForm.id) {
                // We'll need to add a PUT route for users if we want to update them
                await axios.put(`${API_URL}/api/users/${userForm.id}`, userForm);
                alert('User updated successfully');
            } else {
                await axios.post(`${API_URL}/api/users`, userForm);
                alert('User created successfully');
            }
            setUserForm({ id: null, username: '', password: '', role: 'admin' });
            setEditingUser(false);
            fetchUsers();
        } catch (err) { alert(err.response?.data?.message || 'Error saving user'); }
    };

    const startEditUser = (u) => {
        const pass = window.prompt('Security Verification: Enter admin password to edit this account');
        if (pass !== 'admin123') return alert('Incorrect password');
        setUserForm({ id: u.id, username: u.username, password: '', role: u.role });
        setEditingUser(true);
    };

    const deleteUser = async (id) => {
        const pass = window.prompt('Security Verification: Enter admin password to delete this account');
        if (pass !== 'admin123') return alert('Incorrect password');
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`${API_URL}/api/users/${id}`);
            fetchUsers();
        } catch (err) { console.error(err); }
    };

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/events`);
            if (res.data.success) setEvents(res.data.data);
        } catch (err) { console.error(err); }
    };

    const fetchRegistrations = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/registrations`);
            if (res.data.success) setRegistrations(res.data.data);
        } catch (err) { console.error(err); }
    };

    const deleteRegistration = async (id) => {
        if (!window.confirm('Delete this registration? This cannot be undone.')) return;
        try {
            await axios.delete(`${API_URL}/api/registrations/${id}`);
            fetchRegistrations();
        } catch (err) { console.error(err); alert('Error deleting registration'); }
    };

    const fetchCallbacks = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/callbacks`);
            if (res.data.success) setCallbacks(res.data.data);
        } catch (err) { console.error(err); }
    };

    const deleteCallback = async (id) => {
        if (!window.confirm('Delete this callback request?')) return;
        try {
            await axios.delete(`${API_URL}/api/callbacks/${id}`);
            fetchCallbacks();
        } catch (err) { console.error(err); }
    };

    const fetchInterests = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/interests`);
            if (res.data.success) setInterests(res.data.data);
        } catch (err) { console.error(err); }
    };

    const addInterest = async () => {
        if (!newInterest.trim()) return;
        try {
            await axios.post(`${API_URL}/api/interests`, { label: newInterest.trim() });
            setNewInterest('');
            fetchInterests();
        } catch (err) { console.error(err); }
    };

    const deleteInterest = async (id) => {
        if (!window.confirm('Remove this interest option?')) return;
        try {
            await axios.delete(`${API_URL}/api/interests/${id}`);
            fetchInterests();
        } catch (err) { console.error(err); }
    };

    // ── HOD CRUD ─────────────────────────────────────────
    const fetchHods = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/hods`);
            if (res.data.success) setHods(res.data.data);
        } catch (err) { console.error(err); }
    };

    const resetHodForm = () => setHodForm({ id: null, name: '', designation: '', department: '', phone: '', email: '', branch: '', initials: '', color: '#0052CC', vcard_image: null });

    const startEditHod = (h) => { setHodForm({ ...h, vcard_image: null, existing_image: h.vcard_image }); setEditingHod(true); };

    // Help fix Vercel upload issues by compressing images on the client side
    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
                    }, 'image/jpeg', 0.8);
                };
            };
        });
    };

    const saveHod = async (e) => {
        e.preventDefault();
        try {
            const formDataMulti = new FormData();
            formDataMulti.append('name', hodForm.name);
            formDataMulti.append('designation', hodForm.designation);
            formDataMulti.append('department', hodForm.department);
            formDataMulti.append('phone', hodForm.phone);
            formDataMulti.append('email', hodForm.email);
            formDataMulti.append('branch', hodForm.branch);
            formDataMulti.append('initials', hodForm.initials);
            formDataMulti.append('color', hodForm.color);

            if (hodForm.vcard_image) {
                const compressed = await compressImage(hodForm.vcard_image);
                formDataMulti.append('vcard_image', compressed);
            } else if (hodForm.existing_image === null && hodForm.id) {
                formDataMulti.append('vcard_image', ''); // Signals backend to clear image
            }

            if (hodForm.id) {
                await axios.put(`${API_URL}/api/hods/${hodForm.id}`, formDataMulti, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await axios.post(`${API_URL}/api/hods`, formDataMulti, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            resetHodForm(); setEditingHod(false); fetchHods();
        } catch (err) { console.error(err); alert('Error saving HOD'); }
    };

    const deleteHod = async (id) => {
        if (!window.confirm('Delete this HOD? This cannot be undone.')) return;
        try {
            await axios.delete(`${API_URL}/api/hods/${id}`);
            fetchHods();
        } catch (err) { console.error(err); }
    };

    const filteredHods = hods.filter(h => {
        if (!hodSearch) return true;
        const q = hodSearch.toLowerCase();
        return `${h.name} ${h.designation} ${h.department} ${h.branch}`.toLowerCase().includes(q);
    });

    // ── Counselling CRUD ──────────────────────────────────
    const fetchCounsellings = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/counsellings`);
            if (res.data.success) setCounsellings(res.data.data);
        } catch (err) { console.error(err); }
    };

    const resetCounsellingForm = () => setCounsellingForm({ id: null, name: '', mobile: '', preferred_country: '', assigned_counselor: '', status: 'Pending', notes: '' });

    const startEditCounselling = (c) => { setCounsellingForm(c); setEditingCounselling(true); };

    const saveCounselling = async (e) => {
        e.preventDefault();
        try {
            if (counsellingForm.id) {
                await axios.put(`${API_URL}/api/counsellings/${counsellingForm.id}`, counsellingForm);
            } else {
                await axios.post(`${API_URL}/api/counsellings`, counsellingForm);
            }
            resetCounsellingForm(); setEditingCounselling(false); fetchCounsellings();
        } catch (err) { console.error(err); alert('Error saving counselling record'); }
    };

    const deleteCounselling = async (id) => {
        if (!window.confirm('Delete this counselling record? This cannot be undone.')) return;
        try {
            await axios.delete(`${API_URL}/api/counsellings/${id}`);
            fetchCounsellings();
        } catch (err) { console.error(err); }
    };

    const filteredCounsellings = counsellings.filter(c => {
        if (userRole !== 'super_admin') {
            if (!c.assigned_counselor) return false;

            const uname = username.toLowerCase();
            const counselorFull = c.assigned_counselor.toLowerCase();
            const counselorFirst = counselorFull.split(' ')[0];

            // 1. Try strict email match via HOD database
            const loggedInHod = hods.find(h => h.email?.toLowerCase() === uname);
            let matchesHod = false;
            if (loggedInHod && counselorFull.includes(loggedInHod.name.toLowerCase())) matchesHod = true;

            // 2. Try implicit match: if your username contains their first name
            let matchesImplicit = uname.includes(counselorFirst);

            if (!matchesHod && !matchesImplicit) {
                return false;
            }
        }
        if (!counsellingSearch) return true;
        const q = counsellingSearch.toLowerCase();
        return `${c.name} ${c.mobile} ${c.preferred_country} ${c.assigned_counselor}`.toLowerCase().includes(q);
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Trim username to prevent accidental space issues
            const res = await axios.post(`${API_URL}/api/login`, {
                username: username.trim(),
                password
            });
            if (res.data.success) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('userRole', res.data.role);
                sessionStorage.setItem('username', res.data.username);
                setIsLogged(true);
                setUserRole(res.data.role);
                setUsername(res.data.username); // Ensure synced with potentially trimmed value
            }
        } catch (err) {
            console.error('Login error:', err);
            alert(err.response?.data?.message || 'Login failed - check your credentials or database connection');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('username');
        setIsLogged(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleTagChange = (tagObj) => {
        setFormData(prev => {
            const exists = prev.tags.find(t => t.id === tagObj.id);
            return exists
                ? { ...prev, tags: prev.tags.filter(t => t.id !== tagObj.id) }
                : { ...prev, tags: [...prev.tags, tagObj] };
        });
    };

    const resetForm = () => {
        setFormData({
            id: null, month: 'march', type: 'seminar', ribbonColor: '', customType: '',
            dateDayStr: '', dateMonthStr: '', title: '', subtitle: '',
            venue: '', time: '', isOnline: false, activitiesLabel: 'Activities',
            activities: '', searchKeys: '', is_active: true, is_featured: false, tags: [], teamLead: ''
        });
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (payload.type === 'other') payload.type = payload.customType;
            if (isEditing) {
                await axios.put(`${API_URL}/api/events/${formData.id}`, payload);
            } else {
                await axios.post(`${API_URL}/api/events`, payload);
            }
            resetForm();
            fetchEvents();
            alert(`Event ${isEditing ? 'updated' : 'created'} successfully!`);
        } catch (err) {
            console.error(err);
            alert('Error saving event');
        }
    };

    const editEvent = (ev) => {
        let typeVal = ev.type;
        let customTypeVal = '';
        if (!EVENT_CATEGORIES.some(cat => cat.id === ev.type)) {
            typeVal = 'other';
            customTypeVal = ev.type;
        }
        setFormData({ ...ev, type: typeVal, customType: customTypeVal });
        setIsEditing(true);
    };

    const toggleActive = async (ev) => {
        try {
            await axios.put(`${API_URL}/api/events/${ev.id}`, { ...ev, is_active: !ev.is_active });
            fetchEvents();
        } catch (err) { console.error(err); }
    };

    const deleteEvent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await axios.delete(`${API_URL}/api/events/${id}`);
            fetchEvents();
        } catch (err) { console.error(err); }
    };

    const deleteAllEvents = async () => {
        const confirmFirst = window.confirm('Are you absolutely sure you want to delete ALL events?');
        if (!confirmFirst) return;

        const confirmSecond = window.confirm('This action CANNOT be undone. Click OK to proceed with wiping the database of all events.');
        if (!confirmSecond) return;

        try {
            await axios.delete(`${API_URL}/api/events/all`);
            fetchEvents();
            alert('All events have been successfully deleted.');
        } catch (err) {
            console.error(err);
            alert('Error deleting events.');
        }
    };

    // ── Registrations helpers ────────────────────────────
    const filteredRegs = registrations.filter(r => {
        const matchEvent = regFilter ? r.event_title === regFilter : true;
        const matchType = typeFilter === 'all' ? true
            : typeFilter === 'kanan' ? r.student_type === 'kanan'
                : r.student_type === 'non-kanan';
        return matchEvent && matchType;
    });

    const exportCSV = () => {
        const params = new URLSearchParams();
        if (regFilter) params.set('event', regFilter);
        window.open(`${API_URL}/api/registrations/export?${params}`, '_blank');
    };

    const kananCount = filteredRegs.filter(r => r.student_type === 'kanan').length;
    const nonKananCount = filteredRegs.filter(r => r.student_type === 'non-kanan').length;

    // ── Auth screen ──────────────────────────────────────
    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F6FA' }}>
                <div style={{ background: '#fff', padding: '48px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(11,18,35,0.1)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <img src={logoImg} style={{ width: '130px', mixBlendMode: 'multiply', marginBottom: '24px' }} alt="Kanan" />
                    <h2 style={{ marginBottom: '8px', color: '#0B1223' }}>Admin Login</h2>
                    <p style={{ color: '#7B8599', fontSize: '14px', marginBottom: '28px' }}>Sign in to your account</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ ...inputStyle, textAlign: 'center' }} required />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, textAlign: 'center' }} required />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>Login</button>
                    </form>
                    <Link to="/" style={{ display: 'block', marginTop: '20px', color: '#7B8599', fontSize: '13px' }}>← Back to Calendar</Link>
                </div>
            </div>
        );
    }

    // ── Main Dashboard Render ───────────────────────────
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <Link to="/admin"><img src={logoImg} className="admin-logo" alt="Kanan" /></Link>

                <div className="admin-nav">
                    <button className={`admin-nav-item ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')} data-icon="📅">Events</button>
                    <button className={`admin-nav-item ${activeTab === 'registrations' ? 'active' : ''}`} onClick={() => setActiveTab('registrations')} data-icon="👥">Registrations</button>
                    {userRole === 'super_admin' && (
                        <button className={`admin-nav-item ${activeTab === 'hods' ? 'active' : ''}`} onClick={() => setActiveTab('hods')} data-icon="👤">HODs</button>
                    )}
                    <button className={`admin-nav-item ${activeTab === 'counselling' ? 'active' : ''}`} onClick={() => setActiveTab('counselling')} data-icon="🎓">Counselling</button>
                    <button className={`admin-nav-item ${activeTab === 'slot_management' ? 'active' : ''}`} onClick={() => setActiveTab('slot_management')} data-icon="⏳">Slot Management</button>
                    {userRole === 'super_admin' && (
                        <button className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')} data-icon="🔑">Manage Logins</button>
                    )}
                </div>

                <div className="admin-actions-group">
                    <button onClick={handleLogout} className="admin-nav-item" data-icon="🚪" style={{ color: '#FF4D4D' }}>Logout</button>
                    <Link to="/" className="admin-nav-item" data-icon="🌐">View Site</Link>
                </div>
            </div>

            {/* Main content */}
            <div className="admin-main" onClick={() => { if (showProfileMenu) setShowProfileMenu(false) }}>

                {/* ── Top Bar Profile Menu ── */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px', position: 'relative' }}>
                    <div
                        onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); }}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#44b772', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', userSelect: 'none' }}
                    >
                        {userRole === 'super_admin' ? 'SA' : username.substring(0, 2).toUpperCase() || 'AD'}
                    </div>
                    {showProfileMenu && (
                        <div style={{ position: 'absolute', top: '50px', right: '0', background: '#fff', borderRadius: '6px', border: '1px solid #E2E8F0', padding: '6px 0', minWidth: '160px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <div style={{ padding: '8px 16px', color: '#7B8599', fontSize: '14px', borderBottom: '1px solid #E2E8F0', marginBottom: '4px' }}>
                                {userRole === 'super_admin' ? 'Super Admin' : 'Sub Admin'}
                            </div>
                            <div style={{ padding: '8px 16px', color: '#0B1223', fontSize: '14px', cursor: 'pointer' }} onClick={() => setActiveTab('profile')}>Profile</div>
                            <div style={{ padding: '8px 16px', color: '#FF4D4D', fontSize: '14px', cursor: 'pointer' }} onClick={handleLogout}>Logout</div>
                        </div>
                    )}
                </div>

                {/* ═══ EVENTS TAB ═══ */}
                {activeTab === 'events' && (
                    <>
                        <div className="admin-header">
                            <h2>Event Management</h2>
                            <div className="btn-group" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <button
                                    onClick={downloadSampleCSV}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#FFF0E0', color: '#FF6B00', border: '1px solid #FF6B00', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                                >
                                    📥 Sample CSV
                                </button>
                                {userRole === 'super_admin' && (
                                    <button
                                        onClick={deleteAllEvents}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#E53935', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                                    >
                                        🗑 Delete All
                                    </button>
                                )}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0052CC', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', margin: 0 }}>
                                    ⬆ Import CSV
                                    <input type="file" accept=".csv" style={{ display: 'none' }} onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        const confirm = window.confirm('Import events from CSV?');
                                        if (!confirm) { e.target.value = ''; return; }
                                        const fdata = new FormData();
                                        fdata.append('csv_file', file);
                                        try {
                                            const res = await axios.post(`${API_URL}/api/events/bulk`, fdata, { headers: { 'Content-Type': 'multipart/form-data' } });
                                            alert(res.data.message || 'Events imported successfully!');
                                            fetchEvents();
                                        } catch (err) {
                                            console.error(err);
                                            alert(err.response?.data?.message || 'Error importing events');
                                        }
                                        e.target.value = '';
                                    }} style={{ display: 'none' }} />
                                </label>
                            </div>
                        </div>
                        <div className="admin-event-split">
                            {/* Form */}
                            <div className="admin-event-form-wrap admin-card">
                                <h3 style={{ fontSize: '16px', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0' }}>
                                    {isEditing ? '✏️ Edit Event' : '✨ Create New Event'}
                                </h3>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <input name="title" placeholder="Event Title *" value={formData.title} onChange={handleChange} required style={inputStyle} />
                                    <input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} style={inputStyle} />
                                    {(() => {
                                        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                                        const monthIndex = months.indexOf((formData.month || 'march').toLowerCase()) + 1;
                                        const mm = monthIndex > 0 ? String(monthIndex).padStart(2, '0') : '03';
                                        let dd = formData.dateDayStr ? String(formData.dateDayStr).padStart(2, '0') : '';
                                        if (dd.length > 2) dd = dd.slice(0, 2); // safety fallback

                                        const yyyy = new Date().getFullYear() >= 2026 ? new Date().getFullYear() : 2026;
                                        const dateVal = dd ? `${yyyy}-${mm}-${dd}` : '';

                                        return (
                                            <div style={{ position: 'relative' }}>
                                                <label style={{ position: 'absolute', top: '-8px', left: '10px', background: '#fff', padding: '0 4px', fontSize: '10px', fontWeight: 'bold', color: '#7B8599', zIndex: '1' }}>Event Date</label>
                                                <input
                                                    type="date"
                                                    value={dateVal}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (!val) {
                                                            setFormData({ ...formData, dateDayStr: '', dateMonthStr: '', month: 'march' });
                                                            return;
                                                        }
                                                        const [, m, d] = val.split('-');
                                                        const monthInt = parseInt(m, 10);
                                                        const mShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                                        setFormData({
                                                            ...formData,
                                                            dateDayStr: d,
                                                            dateMonthStr: mShort[monthInt - 1],
                                                            month: months[monthInt - 1]
                                                        });
                                                    }}
                                                    required
                                                    style={{ ...inputStyle, width: '100%', cursor: 'pointer', fontFamily: 'inherit', color: dateVal ? '#0B1223' : '#7B8599' }}
                                                />
                                            </div>
                                        );
                                    })()}
                                    <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} style={inputStyle} />
                                    {(() => {
                                        let startTime = '';
                                        let endTime = '';
                                        const t = formData.time || '';
                                        if (t.includes(' – ')) { [startTime, endTime] = t.split(' – '); }
                                        else if (t.includes(' - ')) { [startTime, endTime] = t.split(' - '); }
                                        else if (t.includes(' TO ')) { [startTime, endTime] = t.split(' TO '); }
                                        else if (t.includes(' to ')) { [startTime, endTime] = t.split(' to '); }
                                        else if (t) { startTime = t; endTime = ''; }

                                        startTime = startTime ? startTime.trim() : '';
                                        endTime = endTime ? endTime.trim() : '';
                                        if (startTime === '7:00 PM') startTime = '07:00 PM'; // Normalization for old entries
                                        if (endTime === '7:00 PM') endTime = '07:00 PM';
                                        if (endTime === '5:00 PM') endTime = '05:00 PM';

                                        const TIMES = ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"];

                                        return (
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <select
                                                    value={startTime}
                                                    onChange={(e) => {
                                                        const start = e.target.value;
                                                        setFormData({ ...formData, time: `${start} TO ${endTime || '05:00 PM'}` });
                                                    }}
                                                    style={{ ...inputStyle, flex: '1', cursor: 'pointer' }}
                                                    required
                                                >
                                                    <option value="">Start Time</option>
                                                    {TIMES.map(tm => <option key={tm} value={tm}>{tm}</option>)}
                                                </select>
                                                <span style={{ color: '#7B8599', fontWeight: 'bold', fontSize: '12px' }}>TO</span>
                                                <select
                                                    value={endTime}
                                                    onChange={(e) => {
                                                        const end = e.target.value;
                                                        setFormData({ ...formData, time: `${startTime || '10:00 AM'} TO ${end}` });
                                                    }}
                                                    style={{ ...inputStyle, flex: '1', cursor: 'pointer' }}
                                                    required
                                                >
                                                    <option value="">End Time</option>
                                                    {TIMES.map(tm => <option key={tm} value={tm}>{tm}</option>)}
                                                </select>
                                            </div>
                                        );
                                    })()}
                                    <div style={{ border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '6px' }}>Event Category</label>
                                        <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                                            {EVENT_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                                        </select>
                                        {formData.type === 'other' && (
                                            <input name="customType" placeholder="Custom category name" value={formData.customType} onChange={handleChange} required style={{ ...inputStyle, marginTop: '8px', borderColor: '#0052CC' }} />
                                        )}
                                    </div>
                                    <textarea name="activities" placeholder="Activities (separated by • or newlines)" value={formData.activities} onChange={handleChange} style={{ ...inputStyle, height: '72px', resize: 'vertical' }} />
                                    <div style={{ border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '6px' }}>Mapped HOD / Team Leader (Optional)</label>
                                        <select name="teamLead" value={formData.teamLead || ''} onChange={handleChange} style={inputStyle}>
                                            <option value="">-- No HOD Selected --</option>
                                            {hods.map(h => (
                                                <option key={h.id} value={h.name}>{h.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '8px' }}>Select Tags</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {allTags.map(tag => (
                                                <label key={tag.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                                    <input type="checkbox" checked={formData.tags.some(t => t.id === tag.id)} onChange={() => handleTagChange(tag)} />
                                                    <span className={`ev-tag ${tag.colorClass || 't-coaching'}`}>{tag.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px', marginTop: '12px', borderTop: '1px dashed #E2E8F0', paddingTop: '10px' }}>
                                            <input
                                                type="text"
                                                value={customTagInput}
                                                onChange={e => setCustomTagInput(e.target.value)}
                                                placeholder="Other (Custom Tag...)"
                                                style={{ ...inputStyle, padding: '6px 10px', fontSize: '12px' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!customTagInput.trim()) return;
                                                    const newTagId = 'c_' + customTagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
                                                    const newTag = { id: newTagId, label: customTagInput.trim(), colorClass: 't-coaching' }; // Default generic styling
                                                    if (!formData.tags.some(t => t.id === newTagId || t.label.toLowerCase() === customTagInput.trim().toLowerCase())) {
                                                        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
                                                    }
                                                    setCustomTagInput('');
                                                }}
                                                style={{ padding: '6px 12px', background: '#0052CC', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                                            >Add</button>
                                        </div>
                                    </div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600' }}>
                                        <input type="checkbox" name="isOnline" checked={formData.isOnline} onChange={handleChange} /> Virtual / Online Event
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600' }}>
                                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} /> Active (visible on site)
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', padding: '10px', borderRadius: '8px', background: formData.is_featured ? '#FFF0E0' : '#F4F6FA', border: `1px solid ${formData.is_featured ? '#FF6B00' : '#E2E8F0'}`, cursor: 'pointer' }}>
                                        <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
                                        <span>⭐ Feature in Hero Section</span>
                                        {formData.is_featured && <span style={{ marginLeft: 'auto', fontSize: '11px', background: '#FF6B00', color: '#fff', padding: '2px 8px', borderRadius: '50px' }}>ACTIVE</span>}
                                    </label>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>{isEditing ? 'Update Event' : 'Save Event'}</button>
                                        {isEditing && <button type="button" className="btn btn-outline" onClick={resetForm}>Cancel</button>}
                                    </div>
                                </form>
                            </div>

                            {/* Events list */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {events.map(ev => (
                                    <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#fff', opacity: ev.is_active ? 1 : 0.55, boxShadow: '0 1px 6px rgba(11,18,35,0.03)' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                                <h4 style={{ margin: 0, fontSize: '15px', color: '#0B1223' }}>{ev.title}</h4>
                                                {ev.is_active
                                                    ? <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '50px', background: '#E0FFF0', color: '#00B368', fontWeight: 700 }}>ACTIVE</span>
                                                    : <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '50px', background: '#F4F6FA', color: '#7B8599', fontWeight: 700 }}>INACTIVE</span>}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#7B8599' }}>
                                                <span style={{ fontWeight: '700', color: '#0052CC' }}>{ev.dateDayStr} {ev.dateMonthStr}</span> · {ev.type}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '16px' }}>
                                            <button onClick={() => toggleActive(ev)} style={{ padding: '5px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #ddd', background: ev.is_active ? '#FFF0E0' : '#E0FFF0', cursor: 'pointer', fontWeight: 'bold', color: ev.is_active ? '#FF6B00' : '#00B368' }}>
                                                {ev.is_active ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button onClick={() => editEvent(ev)} style={{ flex: 1, padding: '5px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #0052CC', color: '#0052CC', background: '#fff', cursor: 'pointer' }}>Edit</button>
                                                {userRole === 'super_admin' && (
                                                    <button onClick={() => deleteEvent(ev.id)} style={{ flex: 1, padding: '5px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #E53935', color: '#E53935', background: '#fff', cursor: 'pointer' }}>Delete</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {events.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', color: '#7B8599' }}>
                                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
                                        <h3>No events yet</h3>
                                        <p style={{ fontSize: '13px' }}>Create your first event using the form on the left.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* ═══ REGISTRATIONS TAB ═══ */}
                {activeTab === 'registrations' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                            <h2 style={{ color: '#0B1223', margin: 0 }}>Registrations</h2>
                            <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#00B368', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                                ⬇ Export CSV
                            </button>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                            {[
                                { label: 'Total', value: filteredRegs.length, color: '#0052CC', bg: '#E8F1FF' },
                                { label: 'Kanan Students', value: kananCount, color: '#00B368', bg: '#E0FFF0' },
                                { label: 'Non-Kanan', value: nonKananCount, color: '#FF6B00', bg: '#FFF0E0' },
                            ].map(s => (
                                <div key={s.label} style={{ flex: 1, minWidth: '130px', background: s.bg, borderRadius: '12px', padding: '18px 20px' }}>
                                    <div style={{ fontSize: '28px', fontWeight: '800', color: s.color }}>{s.value}</div>
                                    <div style={{ fontSize: '12px', color: s.color, fontWeight: '600', opacity: 0.8 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Filters */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <select value={regFilter} onChange={e => setRegFilter(e.target.value)} style={{ ...inputStyle, maxWidth: '300px' }}>
                                <option value="">All Events</option>
                                {[...new Set(registrations.map(r => r.event_title))].map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                {[['all', 'All Types'], ['kanan', 'Kanan'], ['non-kanan', 'Non-Kanan']].map(([val, label]) => (
                                    <button key={val} onClick={() => setTypeFilter(val)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: typeFilter === val ? '#0052CC' : '#fff', color: typeFilter === val ? '#fff' : '#0B1223', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="admin-card admin-table-wrap" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                                    <thead>
                                        <tr style={{ background: '#F4F6FA', borderBottom: '1px solid #E2E8F0' }}>
                                            {['#', 'Name', 'Mobile', 'Email', 'Event', 'Type', 'Kanan ID', 'City', 'Destination', 'Education', 'Referral', 'Date', ''].map(h => (
                                                <th key={h} style={{ padding: '13px 14px', textAlign: 'left', fontSize: '11px', fontWeight: '800', color: '#7B8599', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRegs.map((r, i) => (
                                            <tr key={r.id} style={{ borderBottom: '1px solid #F4F6FA', background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                                                <td style={tdStyle}>{r.id}</td>
                                                <td style={{ ...tdStyle, fontWeight: '600' }}>{r.name}</td>
                                                <td style={tdStyle}>{r.mobile}</td>
                                                <td style={{ ...tdStyle, color: '#0052CC' }}>{r.email}</td>
                                                <td style={{ ...tdStyle, maxWidth: '160px' }}><div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.event_title}</div></td>
                                                <td style={tdStyle}>
                                                    {r.student_type === 'kanan'
                                                        ? <span style={{ background: '#E0FFF0', color: '#00B368', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: '700' }}>Kanan</span>
                                                        : <span style={{ background: '#FFF0E0', color: '#FF6B00', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: '700' }}>Non-Kanan</span>}
                                                </td>
                                                <td style={tdStyle}>{r.kanan_id || '—'}</td>
                                                <td style={tdStyle}>{r.city || '—'}</td>
                                                <td style={tdStyle}>{r.destination || '—'}</td>
                                                <td style={tdStyle}>{r.education_level || '—'}</td>
                                                <td style={tdStyle}>{r.referral_source || '—'}</td>
                                                <td style={{ ...tdStyle, whiteSpace: 'nowrap', color: '#7B8599' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                                                <td style={tdStyle}>
                                                    {userRole === 'super_admin' && (
                                                        <button onClick={() => deleteRegistration(r.id)} style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '5px', border: '1px solid #E53935', color: '#E53935', background: '#fff', cursor: 'pointer', fontWeight: '700' }}>Delete</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredRegs.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#7B8599' }}>
                                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>👥</div>
                                        <h3>No registrations yet</h3>
                                        <p style={{ fontSize: '13px' }}>When users register for events they will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}



                {/* ─── HODs TAB ─────────────────────────────── */}
                {activeTab === 'hods' && (
                    <>
                        <div style={{ marginBottom: '28px' }}>
                            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>👤 Manage HODs</h2>
                            <p style={{ color: '#7B8599', fontSize: '14px' }}>Add, edit or remove Heads of Departments who are mapped on event cards.</p>
                        </div>

                        {/* Add / Edit Form */}
                        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px', marginBottom: '28px' }}>
                            <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#0052CC' }}>
                                {editingHod && hodForm.id ? '✏️ Edit HOD' : '➕ Add New HOD'}
                            </h3>
                            <form onSubmit={saveHod}>
                                {/* Avatar preview */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: hodForm.color || '#0052CC', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: '800', fontSize: '22px', flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
                                        {hodForm.initials || '?'}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#7B8599' }}>Avatar Color</label>
                                        <input type="color" value={hodForm.color || '#0052CC'} onChange={e => setHodForm(f => ({ ...f, color: e.target.value }))} style={{ width: '44px', height: '36px', borderRadius: '8px', border: '2px solid #E2E8F0', cursor: 'pointer', padding: '2px' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Full Name *</label>
                                        <input required value={hodForm.name} onChange={e => setHodForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Anil Goel" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Initials (shown on active generated card)</label>
                                        <input value={hodForm.initials} onChange={e => setHodForm(f => ({ ...f, initials: e.target.value.toUpperCase().slice(0, 4) }))} placeholder="e.g. AG" style={inputStyle} maxLength={4} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Designation *</label>
                                        <input required value={hodForm.designation} onChange={e => setHodForm(f => ({ ...f, designation: e.target.value }))} placeholder="e.g. Head – Canada & B2C" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Department *</label>
                                        <input required value={hodForm.department} onChange={e => setHodForm(f => ({ ...f, department: e.target.value }))} placeholder="e.g. Canada Admissions & B2C" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Mobile Number *</label>
                                        <input required value={hodForm.phone} onChange={e => setHodForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Email</label>
                                        <input type="email" value={hodForm.email} onChange={e => setHodForm(f => ({ ...f, email: e.target.value }))} placeholder="name@kananinternational.com" style={inputStyle} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Branch / Office Location</label>
                                        <input value={hodForm.branch} onChange={e => setHodForm(f => ({ ...f, branch: e.target.value }))} placeholder="e.g. Kanan House, 2nd Floor, Trident Complex, Vadodara" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Custom Visiting Card Image (Overrides Auto-gen)</label>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input id="vcard_upload_input" type="file" accept="image/*" onChange={e => setHodForm(f => ({ ...f, vcard_image: e.target.files[0] }))} style={{ ...inputStyle, padding: '8px 14px' }} />
                                            {(hodForm.vcard_image || hodForm.existing_image) && (
                                                <button type="button" onClick={() => {
                                                    setHodForm(f => ({ ...f, vcard_image: null, existing_image: null }));
                                                    const fileInput = document.getElementById('vcard_upload_input');
                                                    if (fileInput) fileInput.value = '';
                                                }} style={{ padding: '8px', background: '#ffebee', color: '#d32f2f', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', flexShrink: 0 }}>Remove</button>
                                            )}
                                        </div>
                                        {(hodForm.existing_image && !hodForm.vcard_image) && (
                                            <div style={{ fontSize: '11px', color: '#00B368', marginTop: '4px' }}>Current custom card uploaded</div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" style={{ padding: '11px 24px', background: '#0052CC', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                                        {hodForm.id ? '✅ Update HOD' : '➕ Add HOD'}
                                    </button>
                                    {hodForm.id && (
                                        <button type="button" onClick={() => { resetHodForm(); setEditingHod(false); }} style={{ padding: '11px 20px', background: '#F4F6FA', color: '#3D4A63', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Search & HOD Count */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: '16px', fontWeight: '700' }}>All HODs <span style={{ background: '#E8F1FF', color: '#0052CC', fontSize: '12px', padding: '3px 10px', borderRadius: '20px', fontWeight: '700', marginLeft: '6px' }}>{filteredHods.length}</span></h3>
                            <input value={hodSearch} onChange={e => setHodSearch(e.target.value)} placeholder="🔍 Search by name, dept, branch..." style={{ ...inputStyle, width: '280px' }} />
                        </div>

                        {/* HOD Table */}
                        <div className="admin-card admin-table-wrap" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                                    <thead>
                                        <tr style={{ background: '#F4F6FA', borderBottom: '1px solid #E2E8F0' }}>
                                            {['Initial', 'Name', 'Designation', 'Department', 'Phone/Email', 'Branch', 'Actions'].map(h => (
                                                <th key={h} style={{ padding: '13px 14px', textAlign: 'left', fontSize: '11px', fontWeight: '800', color: '#7B8599', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredHods.map((h, i) => (
                                            <tr key={h.id} style={{ borderBottom: '1px solid #F4F6FA', background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                                                <td style={tdStyle}>
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: h.color || '#0052CC', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '12px', fontWeight: '800' }}>
                                                        {h.initials || h.name.slice(0, 2)}
                                                    </div>
                                                </td>
                                                <td style={{ ...tdStyle, fontWeight: '700' }}>{h.name}</td>
                                                <td style={tdStyle}>{h.designation}</td>
                                                <td style={tdStyle}>{h.department}</td>
                                                <td style={tdStyle}>
                                                    <div style={{ fontSize: '12px' }}>{h.phone}</div>
                                                    <div style={{ fontSize: '11px', color: '#0052CC' }}>{h.email}</div>
                                                </td>
                                                <td style={tdStyle}>{h.branch}</td>
                                                <td style={{ ...tdStyle, textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                        <button onClick={() => { startEditHod(h); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: '5px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #0052CC', color: '#0052CC', background: '#fff', cursor: 'pointer', fontWeight: '700' }}>Edit</button>
                                                        <button onClick={() => deleteHod(h.id)} style={{ padding: '5px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #E53935', color: '#E53935', background: '#fff', cursor: 'pointer', fontWeight: '700' }}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredHods.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#7B8599' }}>
                                        <h3>No HODs found</h3>
                                        <p style={{ fontSize: '13px' }}>Use the form above to add your first HOD.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* ═══ COUNSELLING TAB ═══ */}
                {activeTab === 'counselling' && (
                    <>
                        <h2 style={{ marginBottom: '28px', color: '#0B1223' }}>🎓 Manage Counselling</h2>

                        {/* Add/Edit Form */}
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(11,18,35,0.04)', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0' }}>
                                {editingCounselling ? '✏️ Edit Student Counselling Record' : '✨ Add New Counselling Record'}
                            </h3>
                            <form onSubmit={saveCounselling}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Student Name *</label>
                                        <input required value={counsellingForm.name} onChange={e => setCounsellingForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Rahul Sharma" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Mobile Number *</label>
                                        <input required value={counsellingForm.mobile} onChange={e => setCounsellingForm(f => ({ ...f, mobile: e.target.value }))} placeholder="+91 XXXXX XXXXX" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Preferred Country</label>
                                        <input value={counsellingForm.preferred_country} onChange={e => setCounsellingForm(f => ({ ...f, preferred_country: e.target.value }))} placeholder="e.g. Canada, UK, USA" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Assigned Counselor</label>
                                        <input value={counsellingForm.assigned_counselor} onChange={e => setCounsellingForm(f => ({ ...f, assigned_counselor: e.target.value }))} placeholder="Counselor Name" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Status</label>
                                        <select value={counsellingForm.status} onChange={e => setCounsellingForm(f => ({ ...f, status: e.target.value }))} style={inputStyle}>
                                            <option value="Pending">🕐 Pending</option>
                                            <option value="Counselling Done">✅ Counselling Done</option>
                                            <option value="Reschedule">🔄 Reschedule</option>
                                            <option value="Cancelled">❌ Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '18px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7B8599', marginBottom: '5px' }}>Notes</label>
                                    <textarea value={counsellingForm.notes} onChange={e => setCounsellingForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any discussion notes or details..." style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" style={{ padding: '11px 24px', background: '#FF3366', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                                        {editingCounselling ? '✅ Update Record' : '➕ Save Record'}
                                    </button>
                                    {editingCounselling && (
                                        <button type="button" onClick={() => { resetCounsellingForm(); setEditingCounselling(false); }} style={{ padding: '11px 20px', background: '#F4F6FA', color: '#3D4A63', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Search Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: '16px', fontWeight: '700' }}>All Records <span style={{ background: '#FFE5EC', color: '#FF3366', fontSize: '12px', padding: '3px 10px', borderRadius: '20px', fontWeight: '700', marginLeft: '6px' }}>{filteredCounsellings.length}</span></h3>
                            <input value={counsellingSearch} onChange={e => setCounsellingSearch(e.target.value)} placeholder="🔍 Search student, mobile, country..." style={{ ...inputStyle, width: '280px' }} />
                        </div>

                        {/* Table */}
                        <div className="admin-card admin-table-wrap" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                                    <thead>
                                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#7B8599', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <th style={{ padding: '14px' }}>Registered On</th>
                                            <th style={{ padding: '14px' }}>Student</th>
                                            <th style={{ padding: '14px' }}>Timing / Date</th>
                                            <th style={{ padding: '14px' }}>Country</th>
                                            <th style={{ padding: '14px' }}>Counselor</th>
                                            <th style={{ padding: '14px' }}>Status</th>
                                            <th style={{ padding: '14px', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCounsellings.map(c => {
                                            const timingMatch = c.notes ? c.notes.match(/📅\s*([^·]+)·\s*🕐\s*([^·]+)/) : null;
                                            const sessionDate = timingMatch ? timingMatch[1].trim() : null;
                                            const sessionTime = timingMatch ? timingMatch[2].trim() : null;
                                            const sc = {
                                                'Counselling Done': { bg: '#E0FFF0', color: '#00B368' },
                                                'Reschedule': { bg: '#FFF0E0', color: '#FF6B00' },
                                                'Cancelled': { bg: '#FEF2F2', color: '#E53935' },
                                                'Pending': { bg: '#E8F1FF', color: '#0052CC' }
                                            }[c.status] || { bg: '#F4F6FA', color: '#7B8599' };
                                            return (
                                                <tr key={c.id} style={{ borderBottom: '1px solid #F0F3F8' }}>
                                                    <td style={tdStyle}>{new Date(c.created_at).toLocaleDateString()}</td>
                                                    <td style={tdStyle}>
                                                        <div style={{ fontWeight: '600', color: '#0B1223' }}>{c.name}</div>
                                                        <div style={{ fontSize: '12px', color: '#7B8599' }}>{c.mobile}</div>
                                                    </td>
                                                    <td style={tdStyle}>
                                                        {sessionDate ? (
                                                            <div>
                                                                <div style={{ fontWeight: '600', color: '#0B1223', fontSize: '13px' }}>{sessionDate}</div>
                                                                <div style={{ fontSize: '12px', color: '#7B8599' }}>🕐 {sessionTime}</div>
                                                            </div>
                                                        ) : <span style={{ color: '#B0BAC9' }}>—</span>}
                                                    </td>
                                                    <td style={tdStyle}>{c.preferred_country || '-'}</td>
                                                    <td style={tdStyle}>{c.assigned_counselor || '-'}</td>
                                                    <td style={tdStyle}>
                                                        <select
                                                            value={c.status}
                                                            onChange={async e => {
                                                                await axios.put(`${API_URL}/api/counsellings/${c.id}`, { ...c, status: e.target.value });
                                                                fetchCounsellings();
                                                            }}
                                                            style={{ padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: '700', border: 'none', cursor: 'pointer', background: sc.bg, color: sc.color, appearance: 'auto' }}
                                                        >
                                                            <option value="Pending">🕐 Pending</option>
                                                            <option value="Counselling Done">✅ Counselling Done</option>
                                                            <option value="Reschedule">🔄 Reschedule</option>
                                                            <option value="Cancelled">❌ Cancelled</option>
                                                        </select>
                                                    </td>
                                                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                                                        {userRole === 'super_admin' && (
                                                            <>
                                                                <button onClick={() => { startEditCounselling(c); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: '5px 10px', marginRight: '6px', fontSize: '12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#fff', color: '#3D4A63', cursor: 'pointer' }}>Edit</button>
                                                                <button onClick={() => deleteCounselling(c.id)} style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #FEE2E2', background: '#FEF2F2', color: '#E53935', cursor: 'pointer' }}>Delete</button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {filteredCounsellings.length === 0 && (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: 'center', padding: '40px 20px', color: '#7B8599' }}>No counselling records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}



                {/* ═══ USERS TAB (Super Admin only) ═══ */}
                {activeTab === 'users' && userRole === 'super_admin' && (
                    <>
                        <div className="admin-header">
                            <h2>Manage Dashboard Logins</h2>
                        </div>
                        <div className="admin-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                            <div className="admin-card">
                                <h3>{editingUser ? '✏️ Edit User Account' : '➕ Create New Account'}</h3>
                                <form onSubmit={saveUser} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                                    <div>
                                        <label style={{ fontSize: '12px', color: '#7B8599', fontWeight: '700' }}>USERNAME</label>
                                        <input type="text" value={userForm.username} onChange={e => setUserForm({ ...userForm, username: e.target.value })} style={inputStyle} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', color: '#7B8599', fontWeight: '700' }}>{editingUser ? 'NEW PASSWORD (LEAVE BLANK TO KEEP)' : 'PASSWORD'}</label>
                                        <input type="password" value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} style={inputStyle} required={!editingUser} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', color: '#7B8599', fontWeight: '700' }}>ACCOUNT ROLE</label>
                                        <select value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value })} style={inputStyle}>
                                            <option value="admin">Admin (Events & Counselling)</option>
                                            <option value="super_admin">Super Admin (Full Access)</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingUser ? 'Update Account' : 'Create User Account'}</button>
                                        {editingUser && <button type="button" className="btn btn-outline" onClick={() => { setUserForm({ id: null, username: '', password: '', role: 'admin' }); setEditingUser(false); }}>Cancel</button>}
                                    </div>
                                </form>
                            </div>

                            <div className="admin-card admin-table-wrap" style={{ padding: 0 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                                    <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                        <tr>
                                            <th style={{ padding: '14px', fontSize: '11px', fontWeight: '800', color: '#7B8599', textTransform: 'uppercase' }}>Username</th>
                                            <th style={{ padding: '14px', fontSize: '11px', fontWeight: '800', color: '#7B8599', textTransform: 'uppercase' }}>Role</th>
                                            <th style={{ padding: '14px', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id} style={{ borderBottom: '1px solid #F0F3F8' }}>
                                                <td style={{ ...tdStyle, fontWeight: '700' }}>{u.username}</td>
                                                <td style={tdStyle}>
                                                    <span style={{ padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: '700', background: u.role === 'super_admin' ? '#EBF5FF' : '#F1F5F9', color: u.role === 'super_admin' ? '#0070F3' : '#475569' }}>
                                                        {u.role === 'super_admin' ? '⚡ Super Admin' : '👤 Admin'}
                                                    </span>
                                                </td>
                                                <td style={{ ...tdStyle, textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                        <button onClick={() => startEditUser(u)} style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #0052CC', background: '#fff', color: '#0052CC', cursor: 'pointer', fontWeight: '700' }}>Edit</button>
                                                        {u.username !== 'admin' && (
                                                            <button onClick={() => deleteUser(u.id)} style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #FEE2E2', background: '#FEF2F2', color: '#E53935', cursor: 'pointer', fontWeight: '700' }}>Delete</button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* ═══ SLOT MANAGEMENT TAB ═══ */}
                {activeTab === 'slot_management' && (
                    <div style={{ textAlign: 'center', padding: '100px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                        <div style={{ fontSize: '64px', marginBottom: '20px' }}>⏳</div>
                        <h2 style={{ fontSize: '28px', color: '#0B1223', marginBottom: '12px', fontFamily: "'Sora', sans-serif", fontWeight: '700' }}>Slot Management</h2>
                        <h3 style={{ fontSize: '18px', color: '#FF6B00', marginBottom: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Coming Soon</h3>
                        <p style={{ color: '#7B8599', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>We are working hard to bring you a powerful new scheduling and slot management system. Stay tuned for updates!</p>
                    </div>
                )}

                {/* ═══ PROFILE TAB ═══ */}
                {activeTab === 'profile' && (() => {
                    const loggedInHod = hods.find(h => h.email?.toLowerCase() === username.toLowerCase());
                    return (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                            <div className="admin-header">
                                <h2>Your Profile</h2>
                            </div>
                            <div className="admin-card" style={{ padding: '40px', textAlign: 'center' }}>
                                <div style={{
                                    width: '100px', height: '100px', borderRadius: '50%', background: loggedInHod?.color || '#0052CC',
                                    color: '#fff', fontSize: '40px', fontWeight: 'bold', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', margin: '0 auto 20px'
                                }}>
                                    {loggedInHod ? loggedInHod.initials : (userRole === 'super_admin' ? 'SA' : username.substring(0, 2).toUpperCase() || 'AD')}
                                </div>
                                <h3 style={{ fontSize: '24px', color: '#0B1223', marginBottom: '8px', fontFamily: "'Sora', sans-serif" }}>
                                    {loggedInHod ? loggedInHod.name : (userRole === 'super_admin' ? 'Super Admin' : 'Admin User')}
                                </h3>
                                <p style={{ fontSize: '16px', color: '#7B8599', marginBottom: '20px', fontWeight: '500' }}>
                                    {loggedInHod ? loggedInHod.designation : 'Access Level: ' + userRole}
                                </p>

                                <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '24px', textAlign: 'left', marginTop: '30px' }}>
                                    <h4 style={{ fontSize: '14px', color: '#7B8599', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Account Details</h4>

                                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '14px', color: '#7B8599', fontWeight: '600' }}>Username:</span>
                                        <span style={{ fontSize: '15px', color: '#0B1223', fontWeight: '700' }}>{username}</span>
                                    </div>

                                    {loggedInHod && (
                                        <>
                                            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '14px', color: '#7B8599', fontWeight: '600' }}>Department:</span>
                                                <span style={{ fontSize: '15px', color: '#0B1223', fontWeight: '700' }}>{loggedInHod.department || '-'}</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '14px', color: '#7B8599', fontWeight: '600' }}>Branch:</span>
                                                <span style={{ fontSize: '15px', color: '#0B1223', fontWeight: '700' }}>{loggedInHod.branch || '-'}</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '14px', color: '#7B8599', fontWeight: '600' }}>Phone:</span>
                                                <span style={{ fontSize: '15px', color: '#0B1223', fontWeight: '700' }}>{loggedInHod.phone || '-'}</span>
                                            </div>
                                        </>
                                    )}

                                    <div style={{ marginTop: '30px', borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
                                        <h4 style={{ fontSize: '14px', color: '#7B8599', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Security</h4>
                                        <button
                                            className="btn btn-outline"
                                            style={{ width: '100%', justifyContent: 'center' }}
                                            onClick={() => {
                                                const userId = users.find(u => u.username === username)?.id;
                                                if (userId) startEditUser({ id: userId, username, role: userRole });
                                                setActiveTab('users');
                                            }}
                                        >
                                            🔒 Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>

    );
}

const inputStyle = {
    padding: '11px 14px', borderRadius: '8px', border: '1px solid #E2E8F0',
    fontSize: '14px', fontFamily: 'inherit', width: '100%',
    background: '#fff', outline: 'none', boxSizing: 'border-box'
};

const tdStyle = { padding: '11px 14px', color: '#3D4A63', verticalAlign: 'middle' };

export default AdminDashboard;
