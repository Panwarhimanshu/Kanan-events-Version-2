require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');
const { Readable } = require('stream');

const app = express();

// Database Connection Logic (Move before routes)
let cachedDb = null;
async function initDB() {
    if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('CRITICAL ERROR: MONGODB_URI Environment Variable is missing.');
        throw new Error('MONGODB_URI is missing');
    }

    // Connect with a shorter timeout to avoid Vercel ghost hangs
    const db = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
    });

    // ONLY seed in development or if explicitly requested
    if (process.env.NODE_ENV !== 'production') {
        await seedDefaultData();
    }

    cachedDb = db;
    return db;
}

// Middleware (Increased limits)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database connection middleware (Runs for every request)
app.use(async (req, res, next) => {
    if (req.path === '/api/health') return next(); // Skip DB check for health probe
    try {
        await initDB();
        next();
    } catch (err) {
        console.error('DB Middleware Error:', err.message);
        res.status(503).json({ success: false, message: 'Database connection failed. Please check IP Whitelist.', error: err.message });
    }
});

app.use(cors({
    origin: true,
    credentials: true
}));

// Multer Setup
const upload = multer({ storage: multer.memoryStorage() });
const uploadMemory = multer({ storage: multer.memoryStorage() });

// Schemas
const commonTransform = (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
};

const eventRegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    event_title: { type: String, required: true },
    student_type: { type: String, required: true },
    kanan_id: String,
    city: String,
    destination: String,
    education_level: String,
    referral_source: String,
    created_at: { type: Date, default: Date.now }
});
eventRegistrationSchema.set('toJSON', { transform: commonTransform });
const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

const callbackRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    interest: String,
    created_at: { type: Date, default: Date.now }
});
callbackRequestSchema.set('toJSON', { transform: commonTransform });
const CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema);

const newsletterSubSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now }
});
newsletterSubSchema.set('toJSON', { transform: commonTransform });
const NewsletterSub = mongoose.model('NewsletterSub', newsletterSubSchema);

const eventSchema = new mongoose.Schema({
    month: String,
    type: String,
    ribbonColor: String,
    dateDayStr: String,
    dateMonthStr: String,
    title: { type: String, required: true },
    subtitle: String,
    venue: String,
    time: String,
    tags: [mongoose.Schema.Types.Mixed],
    isOnline: { type: Boolean, default: false },
    activitiesLabel: String,
    activities: String,
    searchKeys: String,
    is_active: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false },
    teamLead: String,
    created_at: { type: Date, default: Date.now }
});
eventSchema.set('toJSON', { transform: commonTransform });
const Event = mongoose.model('Event', eventSchema);

const callbackInterestSchema = new mongoose.Schema({
    label: { type: String, required: true },
    sort_order: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});
callbackInterestSchema.set('toJSON', { transform: commonTransform });
const CallbackInterest = mongoose.model('CallbackInterest', callbackInterestSchema);

const hodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: String,
    department: String,
    phone: String,
    email: String,
    branch: String,
    vcard_image: String,
    initials: String,
    color: { type: String, default: '#0052CC' },
    created_at: { type: Date, default: Date.now }
});
hodSchema.set('toJSON', { transform: commonTransform });
const HOD = mongoose.model('HOD', hodSchema);

const counsellingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    preferred_country: String,
    assigned_counselor: String,
    status: { type: String, default: 'Pending' },
    notes: String,
    created_at: { type: Date, default: Date.now }
});
counsellingSchema.set('toJSON', { transform: commonTransform });
const Counselling = mongoose.model('Counselling', counsellingSchema);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['super_admin', 'admin'], default: 'admin' },
    created_at: { type: Date, default: Date.now }
});
userSchema.set('toJSON', { transform: commonTransform });
const User = mongoose.model('User', userSchema);

// Database Connection
let cachedDb = null;
async function initDB() {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in Environment Variables');
        }

        // Add timeout options to fail faster if the IP is not whitelisted
        const db = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log('Successfully connected to MongoDB Atlas');

        // Seed default HODs, Interests and Users
        await seedDefaultData();
        cachedDb = db;
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error; // Throw so middleware can catch it
    }
}

async function seedDefaultData() {
    // Seed default interests
    const interestsCount = await CallbackInterest.countDocuments();
    if (interestsCount === 0) {
        await CallbackInterest.insertMany([
            { label: 'Study Abroad Counselling', sort_order: 1 },
            { label: 'IELTS / PTE / TOEFL Coaching', sort_order: 2 },
            { label: 'Visa Assistance', sort_order: 3 },
            { label: 'University Admissions', sort_order: 4 },
            { label: 'Scholarship Guidance', sort_order: 5 }
        ]);
        console.log('Seeded default interests');
    }

    // Seed default HODs
    const hodsCount = await HOD.countDocuments();
    if (hodsCount === 0) {
        await HOD.insertMany([
            { name: 'Rajeev Kumar', designation: 'Event Manager', department: 'Event Management & Visa Fairs', phone: '+91 97275 00000', email: 'rajeev@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'RK', color: '#0052CC' },
            { name: 'Anil Goel', designation: 'Head – Canada & B2C', department: 'Canada Admissions & Onshore Support', phone: '+91 63590 75555', email: 'anilgoyal@kananinternational.com', branch: 'Kanan House, 2nd Floor, Trident Complex, Vadodara', initials: 'AG', color: '#003399' },
            { name: 'Bheru Singh', designation: 'Head – Germany Program', department: 'Germany & European Education', phone: '+91 97275 00000', email: 'bheru@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'BS', color: '#1A3A66' },
            { name: 'Sagar Pokhrel', designation: 'Head – Australia Program', department: 'Australia Admissions & Visa', phone: '+91 97275 00000', email: 'sagar@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'SP', color: '#005533' },
            { name: 'Sneha Nair', designation: 'Head – Dubai Program', department: 'Dubai & UAE Education', phone: '+91 97275 00000', email: 'sneha@kananinternational.com', branch: 'Bhyli Branch, Vadodara', initials: 'SN', color: '#CC7A00' },
            { name: 'Ankit Singh', designation: 'Head – Value Added Services', department: 'Loans, Insurance & VAS', phone: '+91 97275 00000', email: 'ankit@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'AS', color: '#006B5B' },
            { name: 'Rahul Rajput', designation: 'Head – Europe & Ireland', department: 'European Education Programs', phone: '+91 97275 00000', email: 'rahul@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'RR', color: '#5500CC' },
            { name: 'Kishori Modi', designation: 'Head – USA & Medicine', department: 'USA Admissions & Medical Education', phone: '+91 97275 00000', email: 'kishori@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'KM', color: '#0052CC' },
            { name: 'Priyannka Patel', designation: 'Head – UK Program', department: 'UK Admissions & Visa', phone: '+91 97275 00000', email: 'priyannka@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'PP', color: '#0052CC' },
            { name: 'Himanshu Panwar', designation: 'Career Mentor Lead', department: 'My Career Mentor Program', phone: '+91 97275 00000', email: 'himanshu@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'HP', color: '#2D2D8B' },
            { name: 'Kinnari V & Sanchita M', designation: 'IELTS & Coaching Trainers', department: 'Test Preparation & Coaching', phone: '+91 97275 00000', email: 'coaching@kananinternational.com', branch: 'Bhyli Branch, Vadodara', initials: 'KS', color: '#8B1A1A' },
            { name: 'Kinnari V & Varsha G', designation: 'IELTS & Coaching Trainers', department: 'Test Preparation & Coaching', phone: '+91 97275 00000', email: 'coaching@kananinternational.com', branch: 'Head Office, Vadodara', initials: 'KV', color: '#8B1A1A' },
            { name: 'Hardik Vadgama & Varsha G', designation: 'B2B & B2C Leads', department: 'B2B Partnerships & B2C Operations', phone: '+91 97275 00000', email: 'b2b@kananinternational.com', branch: 'All Branches, Vadodara', initials: 'HV', color: '#3D0099' },
            { name: 'Varsha Godavale / Vikash Panchal / Akanksha Bagariya', designation: 'Mock Test Coordinators', department: 'Test Preparation & Mock Drives', phone: '+91 97275 00000', email: 'mocktest@kananinternational.com', branch: 'Manjalpur Branch, Vadodara', initials: 'VVA', color: '#995500' }
        ]);
        console.log('Seeded default HODs');
    }

    // Seed default Super Admin
    const defaultUsers = [
        { username: 'admin', password: 'admin123', role: 'super_admin' },
        { username: 'himanshu.panwar@kanan.co', password: 'admin123', role: 'super_admin' }
    ];

    for (const u of defaultUsers) {
        const exists = await User.findOne({ username: u.username });
        if (!exists) {
            await User.create(u);
            console.log(`Seeded default user: ${u.username}`);
        }
    }
}

// ── Auth & User Management ────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        res.json({ success: true, role: user.role, username: user.username });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ created_at: -1 });
        res.json({ success: true, data: users });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/users', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, message: 'Username and password required' });
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ success: false, message: 'Username already exists' });
        const user = new User({ username, password, role: role || 'admin' });
        await user.save();
        res.status(201).json({ success: true, message: 'User created' });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted' });
    } catch (error) { res.status(500).json({ success: false, message: 'Internal server error' }); }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const updates = { username, role };
        if (password) updates.password = password;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        res.json({ success: true, data: user });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── HODs CRUD ──────────────────────────────────────────────────────────────
app.get('/api/hods', async (req, res) => {
    try {
        const rows = await HOD.find().sort({ name: 1 });
        res.json({ success: true, data: rows });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/hods/:id', async (req, res) => {
    try {
        const row = await HOD.findById(req.params.id);
        if (!row) return res.status(404).json({ success: false, message: 'HOD not found' });
        res.json({ success: true, data: row });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/hods', upload.single('vcard_image'), async (req, res) => {
    try {
        const { name, designation, department, phone, email, branch, initials, color } = req.body;
        let vcard_image = null;
        if (req.file) {
            const mime = req.file.mimetype || 'image/png';
            vcard_image = `data:${mime};base64,${req.file.buffer.toString('base64')}`;
        }
        if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
        const newHOD = new HOD({ name, designation: designation || '', department: department || '', phone: phone || '', email: email || '', branch: branch || '', vcard_image, initials: initials || '', color: color || '#0052CC' });
        await newHOD.save();
        res.status(201).json({ success: true, message: 'HOD created', id: newHOD.id });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/hods/:id', upload.single('vcard_image'), async (req, res) => {
    try {
        const { name, designation, department, phone, email, branch, initials, color } = req.body;
        const updateData = { name, designation: designation || '', department: department || '', phone: phone || '', email: email || '', branch: branch || '', initials: initials || '', color: color || '#0052CC' };

        if (req.file) {
            const mime = req.file.mimetype || 'image/png';
            updateData.vcard_image = `data:${mime};base64,${req.file.buffer.toString('base64')}`;
        } else if (req.body.vcard_image === '') {
            updateData.vcard_image = null;
        }

        const updated = await HOD.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'HOD not found' });
        res.json({ success: true, message: 'HOD updated' });
    } catch (e) {
        console.error('Error on PUT /api/hods:', e);
        res.status(500).json({ success: false, message: e.message });
    }
});

app.delete('/api/hods/:id', async (req, res) => {
    try {
        await HOD.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'HOD deleted' });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const {
            name, mobile, email, eventTitle, studentType,
            kananId, city, destination, educationLevel, referralSource
        } = req.body;

        const registration = new EventRegistration({
            name, mobile, email, event_title: eventTitle, student_type: studentType,
            kanan_id: kananId || null, city: city || null, destination: destination || null,
            education_level: educationLevel || null, referral_source: referralSource || null
        });
        await registration.save();
        res.status(201).json({ success: true, message: 'Registration successful', id: registration.id });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/callback', async (req, res) => {
    try {
        const { name, mobile, email, interest } = req.body;
        const request = new CallbackRequest({ name, mobile, email, interest: interest || null });
        await request.save();
        res.status(201).json({ success: true, message: 'Callback request registered', id: request.id });
    } catch (error) {
        console.error('Callback error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        await NewsletterSub.updateOne({ email }, { email }, { upsert: true });
        res.status(201).json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/api/callbacks', async (req, res) => {
    try {
        const rows = await CallbackRequest.find().sort({ created_at: -1 });
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching callbacks:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.delete('/api/callbacks/:id', async (req, res) => {
    try {
        await CallbackRequest.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Callback deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/api/interests', async (req, res) => {
    try {
        const rows = await CallbackInterest.find().sort({ sort_order: 1, _id: 1 });
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/interests', async (req, res) => {
    try {
        const { label } = req.body;
        if (!label || !label.trim()) return res.status(400).json({ success: false, message: 'Label required' });
        const request = new CallbackInterest({ label: label.trim() });
        await request.save();
        res.status(201).json({ success: true, id: request.id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.delete('/api/interests/:id', async (req, res) => {
    try {
        await CallbackInterest.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Interest deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// --- Dynamic Events APIs ---

app.get('/api/events/featured', async (req, res) => {
    try {
        const row = await Event.findOne({ is_featured: true, is_active: true });
        res.json({ success: true, data: row });
    } catch (error) {
        console.error('Error fetching featured event:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/api/events', async (req, res) => {
    try {
        const { activeOnly } = req.query;
        let query = {};
        if (activeOnly === 'true') query.is_active = true;
        const rows = await Event.find(query).sort({ created_at: -1 });
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const data = req.body;
        if (data.is_featured) await Event.updateMany({}, { is_featured: false });
        const newEvent = new Event({
            ...data,
            is_active: data.is_active !== false,
            isOnline: !!data.isOnline,
            is_featured: !!data.is_featured
        });
        await newEvent.save();
        res.status(201).json({ success: true, message: 'Event created', id: newEvent.id });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.put('/api/events/:id', async (req, res) => {
    try {
        const data = req.body;
        if (data.is_featured) await Event.updateMany({ _id: { $ne: req.params.id } }, { is_featured: false });
        const updated = await Event.findByIdAndUpdate(req.params.id, {
            ...data,
            is_active: data.is_active !== false,
            isOnline: !!data.isOnline,
            is_featured: !!data.is_featured
        });
        if (!updated) return res.status(404).json({ success: false, message: 'Event not found' });
        res.json({ success: true, message: 'Event updated' });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.delete('/api/events/all', async (req, res) => {
    try {
        await Event.deleteMany({});
        res.json({ success: true, message: 'All events deleted successfully' });
    } catch (error) {
        console.error('Error deleting all events:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// CSV Bulk Import
app.post('/api/events/bulk', uploadMemory.single('csv_file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No CSV file uploaded' });
        const results = [];
        Readable.from(req.file.buffer)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                let inserted = 0;
                let errors = [];
                for (const row of results) {
                    try {
                        const title = row['Main Event'] || row.title || row.Title || '';
                        if (!title.trim()) continue;

                        const month = (row.Month || row.month || 'march').toLowerCase();
                        const type = row.type || row.Type || row['Event Type'] || 'seminar';
                        const ribbonColor = row.ribbonColor || row.RibbonColor || '';

                        let dateDayStr = '';
                        let dateMonthStr = '';
                        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                        if (row.dateDayStr) {
                            const rawDay = String(row.dateDayStr);
                            if (rawDay.includes('/')) {
                                const parts = rawDay.split('/');
                                dateDayStr = parts[0];
                                dateMonthStr = row.dateMonthStr || monthNames[parseInt(parts[1]) - 1] || parts[1];
                            } else {
                                dateDayStr = rawDay;
                                dateMonthStr = row.dateMonthStr || '';
                            }
                        } else if (row.Date) {
                            const dateParts = String(row.Date).split(/[-/ ]/);
                            dateDayStr = dateParts[0] || '';
                            if (dateParts[1] && isNaN(dateParts[1])) {
                                dateMonthStr = dateParts[1].substring(0, 3);
                            } else if (dateParts[1]) {
                                dateMonthStr = monthNames[parseInt(dateParts[1]) - 1] || dateParts[1];
                            }
                        } else if (row.Day) {
                            dateDayStr = row.Day;
                            dateMonthStr = row.DateMonth || row['Date Month'] || '';
                        }

                        const venue = row.Branch || row.venue || row.Venue || '';
                        const time = row.Time || row.time || '';
                        const activities = row.Activities || row.activities || '';
                        const teamLead = row['Team Leader'] || row.teamLead || row['Team Lead'] || null;
                        const subtitle = row.subtitle || row.Subtitle || '';
                        const searchKeys = row.searchKeys || row['Search Keys'] || '';

                        let parsedTags = [];
                        const rawTags = row.tags || row.Tags || '';
                        if (rawTags) {
                            rawTags.split(',').forEach(t => {
                                t = t.trim().toLowerCase();
                                if (t === 'canada') parsedTags.push({ id: 'canada', label: 'Canada', colorClass: 't-canada' });
                                else if (t === 'uk') parsedTags.push({ id: 'uk', label: 'UK', colorClass: 't-uk' });
                                else if (t === 'usa') parsedTags.push({ id: 'usa', label: 'USA', colorClass: 't-usa' });
                                else if (t === 'australia') parsedTags.push({ id: 'australia', label: 'Australia', colorClass: 't-australia' });
                                else if (t === 'germany') parsedTags.push({ id: 'germany', label: 'Germany', colorClass: 't-germany' });
                                else if (t === 'ireland') parsedTags.push({ id: 'ireland', label: 'Ireland', colorClass: 't-ireland' });
                                else if (t === 'dubai') parsedTags.push({ id: 'dubai', label: 'Dubai', colorClass: 't-dubai' });
                                else if (t === 'ielts') parsedTags.push({ id: 'ielts', label: 'IELTS', colorClass: 't-coaching' });
                                else if (t === 'pte') parsedTags.push({ id: 'pte', label: 'PTE', colorClass: 't-coaching' });
                                else parsedTags.push({ id: t, label: t.charAt(0).toUpperCase() + t.slice(1), colorClass: 't-other' });
                            });
                        }

                        const newEv = new Event({
                            month, type, ribbonColor, dateDayStr, dateMonthStr, title, subtitle,
                            venue, time, tags: parsedTags, isOnline: false, activitiesLabel: 'Activities',
                            activities, searchKeys, is_active: true, is_featured: false, teamLead
                        });
                        await newEv.save();
                        inserted++;
                    } catch (rowErr) {
                        errors.push(rowErr.message);
                    }
                }
                res.status(201).json({
                    success: true,
                    message: `Imported ${inserted} events!${errors.length ? ` (${errors.length} errors)` : ''}`
                });
            });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error during import' });
    }
});

// Counselling
app.get('/api/counsellings', async (req, res) => {
    try {
        const rows = await Counselling.find().sort({ created_at: -1 });
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.post('/api/counsellings', async (req, res) => {
    try {
        const { name, mobile, preferred_country, assigned_counselor, status, notes } = req.body;
        if (!name || !mobile) return res.status(400).json({ success: false, message: 'Name and Mobile are required' });
        const record = new Counselling({ name, mobile, preferred_country, assigned_counselor, status, notes });
        await record.save();
        res.status(201).json({ success: true, message: 'Counselling record created', id: record.id });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.put('/api/counsellings/:id', async (req, res) => {
    try {
        const updated = await Counselling.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Record not found' });
        res.json({ success: true, message: 'Counselling record updated' });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.delete('/api/counsellings/:id', async (req, res) => {
    try {
        await Counselling.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Counselling record deleted' });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// Registrations
app.get('/api/registrations', async (req, res) => {
    try {
        const { event } = req.query;
        let query = {};
        if (event) query.event_title = event;
        const rows = await EventRegistration.find(query).sort({ created_at: -1 });
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.get('/api/registrations/export', async (req, res) => {
    try {
        const { event } = req.query;
        let query = {};
        if (event) query.event_title = event;
        const rows = await EventRegistration.find(query).sort({ created_at: -1 });

        const headers = ['ID', 'Name', 'Mobile', 'Email', 'Event', 'Type', 'Kanan ID', 'City', 'Destination', 'Education Level', 'Referral Source', 'Registered At'];
        const csvRows = rows.map(r => [
            r.id, `"${r.name}"`, r.mobile, r.email, `"${r.event_title}"`,
            r.student_type, r.kanan_id || '', r.city || '', r.destination || '',
            r.education_level || '', r.referral_source || '',
            new Date(r.created_at).toLocaleString('en-IN')
        ].join(','));

        const csv = [headers.join(','), ...csvRows].join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="registrations.csv"`);
        res.send(csv);
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.delete('/api/registrations/:id', async (req, res) => {
    try {
        await EventRegistration.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Registration deleted' });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// Health probe (DB-free)
app.get('/api/health', async (req, res) => {
    try {
        // If they add ?seed=true, we run seeds manually
        if (req.query.seed === 'true') {
            await initDB();
            await seedDefaultData();
            return res.json({ status: 'ok', message: 'Seeds executed successfully' });
        }
        res.json({ status: 'ok', message: 'Kanan Events API is active' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Start Server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, async () => {
        await initDB();
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
