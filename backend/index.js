require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { seedGear, seedUsers, seedBookings } = require('./data/seedGear');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// In-memory operational store with deep copy of seed data
let gearStore = JSON.parse(JSON.stringify(seedGear));
let userStore = JSON.parse(JSON.stringify(seedUsers));
let bookingStore = JSON.parse(JSON.stringify(seedBookings));

// Optional MongoDB connection attempt
let mongoConnected = false;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gearshare_db';

try {
  const mongoose = require('mongoose');
  mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 })
    .then(() => {
      mongoConnected = true;
      console.log('✅ Connected to MongoDB instance at:', MONGO_URI);
    })
    .catch(() => {
      console.log('⚡ MongoDB not detected locally. Operating in high-performance In-Memory Fallback mode.');
    });
} catch (err) {
  console.log('⚡ Running in In-Memory fallback mode.');
}

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mode: mongoConnected ? 'MongoDB' : 'In-Memory Store',
    totalGear: gearStore.length,
    totalBookings: bookingStore.length,
    timestamp: new Date().toISOString()
  });
});

// POST /api/contact - Send a message from the public contact form
app.post('/api/contact', async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
  const subject = typeof req.body?.subject === 'string' ? req.body.subject.trim() : '';
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (name.length > 120 || email.length > 254 || subject.length > 160 || message.length > 5000) {
    return res.status(400).json({ error: 'One or more fields exceed the allowed length.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return res.status(503).json({ error: 'Email delivery is not configured yet. Please contact us by email.' });
  }

  const recipient = process.env.CONTACT_TO_EMAIL || 'dhayanandham80808@gmail.com';
  const senderName = name.replace(/[\r\n]+/g, ' ');
  const from = {
    name: 'GearShare Contact Form',
    address: process.env.SMTP_FROM_EMAIL || SMTP_USER
  };
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: { name: senderName, address: email },
      subject: `GearShare contact: ${(subject || 'New message').replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${senderName}\nEmail: ${email}\nSubject: ${subject || 'Not provided'}\n\n${message}`
    });
  } catch (error) {
    console.error('Contact email delivery failed:', error.message);
    res.status(502).json({ error: 'We could not send your message right now. Please try again or email us directly.' });
    return;
  }

  let confirmationSent = true;
  try {
    await transporter.sendMail({
      from,
      to: email,
      replyTo: recipient,
      subject: 'Thanks for contacting GearShare',
      text: `Hi ${senderName},\n\nThanks for contacting GearShare. We have received your message and will get back to you as soon as possible.\n\nGearShare Team`
    });
  } catch (error) {
    confirmationSent = false;
    console.error('Contact acknowledgment email failed:', error.message);
  }

  res.json({ success: true, confirmationSent, message: 'Your message has been sent.' });
});

// Platform Stats (Admin & Public metrics)
app.get('/api/stats', (req, res) => {
  const totalVolume = bookingStore.reduce((acc, b) => acc + (b.totalPaid || 0), 0);
  const activeRentals = bookingStore.filter(b => b.status === 'Confirmed' || b.status === 'Active').length;
  const categories = {};
  gearStore.forEach(g => {
    categories[g.category] = (categories[g.category] || 0) + 1;
  });

  res.json({
    totalGear: gearStore.length,
    activeRentals,
    totalBookings: bookingStore.length,
    escrowVolume: totalVolume,
    platformRevenue: Math.round(totalVolume * 0.1),
    verifiedLenders: userStore.filter(u => u.role === 'lender').length,
    categories
  });
});

// GET /api/gear - Filterable list of all equipment
app.get('/api/gear', (req, res) => {
  let { category, search, city, minPrice, maxPrice, sort, available } = req.query;
  let results = [...gearStore];

  if (category && category !== 'all') {
    results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (city && city !== 'all') {
    results = results.filter(item => item.city.toLowerCase() === city.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.specs.some(s => s.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    results = results.filter(item => item.dailyRate >= Number(minPrice));
  }
  if (maxPrice) {
    results = results.filter(item => item.dailyRate <= Number(maxPrice));
  }

  if (available === 'true') {
    results = results.filter(item => item.available);
  }

  // Sorting
  if (sort === 'price-asc') {
    results.sort((a, b) => a.dailyRate - b.dailyRate);
  } else if (sort === 'price-desc') {
    results.sort((a, b) => b.dailyRate - a.dailyRate);
  } else if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'reviews') {
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  res.json(results);
});

// GET /api/gear/:id - Single gear detail
app.get('/api/gear/:id', (req, res) => {
  const item = gearStore.find(g => g.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Gear item not found' });
  }
  res.json(item);
});

// POST /api/gear - List new gear (Lender)
app.post('/api/gear', (req, res) => {
  const { title, category, brand, dailyRate, securityDeposit, replacementValue, location, city, description, specs, includedInBox, imageUrl, condition, owner } = req.body;

  if (!title || !category || !dailyRate) {
    return res.status(400).json({ error: 'Title, category, and daily rate are required.' });
  }

  const newGear = {
    id: `gear-${Date.now()}`,
    title,
    category: category.toLowerCase(),
    brand: brand || 'Custom Rig',
    dailyRate: Number(dailyRate),
    securityDeposit: Number(securityDeposit) || Math.round(Number(dailyRate) * 5),
    replacementValue: Number(replacementValue) || Math.round(Number(dailyRate) * 40),
    location: location || 'Bangalore, Central',
    city: city || 'Bengaluru',
    rating: 5.0,
    reviewCount: 0,
    available: true,
    condition: condition || 'Like New',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    images: [imageUrl || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'],
    description: description || 'Professional creative equipment in verified mint condition.',
    specs: Array.isArray(specs) && specs.length ? specs : ['Broadcast Quality Tested', 'Official Accessories Included', 'Sanitized & Fully Charged'],
    includedInBox: Array.isArray(includedInBox) && includedInBox.length ? includedInBox : ['Main Unit', 'Original Power Supply', 'Rugged Carry Case'],
    owner: owner || {
      id: 'user-lender-3',
      name: 'Dhayanandham A.',
      rating: 5.0,
      completedRentals: 20,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      responseRate: '100%',
      responseTime: '< 10 mins',
      verified: true
    },
    reviews: []
  };

  gearStore.unshift(newGear);
  res.status(201).json(newGear);
});

// PUT /api/gear/:id - Update gear or toggle availability
app.put('/api/gear/:id', (req, res) => {
  const index = gearStore.findIndex(g => g.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Gear item not found' });
  }

  gearStore[index] = { ...gearStore[index], ...req.body };
  res.json(gearStore[index]);
});

// DELETE /api/gear/:id - Remove gear item
app.delete('/api/gear/:id', (req, res) => {
  const initialLength = gearStore.length;
  gearStore = gearStore.filter(g => g.id !== req.params.id);
  if (gearStore.length === initialLength) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ success: true, message: 'Item removed successfully.' });
});

// POST /api/gear/:id/reviews - Add customer review
app.post('/api/gear/:id/reviews', (req, res) => {
  const { userName, rating, comment } = req.body;
  const gear = gearStore.find(g => g.id === req.params.id);
  if (!gear) return res.status(404).json({ error: 'Item not found' });

  const review = {
    id: `rev-${Date.now()}`,
    userName: userName || 'Verified Creator',
    rating: Number(rating) || 5,
    date: new Date().toISOString().split('T')[0],
    comment: comment || 'Smooth pickup and great equipment!'
  };

  gear.reviews.unshift(review);
  gear.reviewCount = gear.reviews.length;
  const totalScore = gear.reviews.reduce((sum, r) => sum + r.rating, 0);
  gear.rating = Number((totalScore / gear.reviews.length).toFixed(2));

  res.status(201).json(review);
});

// GET /api/bookings - Filter bookings by renter or lender
app.get('/api/bookings', (req, res) => {
  const { renterId, lenderId } = req.query;
  let results = [...bookingStore];
  if (renterId) {
    results = results.filter(b => b.renterId === renterId);
  }
  if (lenderId) {
    results = results.filter(b => b.lenderId === lenderId);
  }
  res.json(results);
});

// POST /api/bookings - Create new booking with escrow & handover token
app.post('/api/bookings', (req, res) => {
  const { gearId, renterId, renterName, renterEmail, startDate, endDate, pickupLocation } = req.body;
  const gear = gearStore.find(g => g.id === gearId);
  if (!gear) {
    return res.status(404).json({ error: 'Gear item not found.' });
  }

  const start = new Date(startDate || Date.now());
  const end = new Date(endDate || Date.now() + 86400000 * 2);
  const diffTime = Math.abs(end - start);
  const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const rentalFee = rentalDays * gear.dailyRate;
  const insuranceFee = Math.round(rentalFee * 0.1) || 10;
  const securityDeposit = gear.securityDeposit;
  const totalPaid = rentalFee + insuranceFee + securityDeposit;
  const handoverCode = `GS-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: `book-${Date.now()}`,
    gearId: gear.id,
    gearTitle: gear.title,
    gearImage: gear.imageUrl,
    renterId: renterId || 'user-renter-1',
    renterName: renterName || 'Kavya Patel',
    renterEmail: renterEmail || 'kavya@gmail.com',
    lenderId: gear.owner?.id || 'user-lender-3',
    lenderName: gear.owner?.name || 'Dhayanandham A.',
    startDate: startDate || new Date().toISOString().split('T')[0],
    endDate: endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    rentalDays,
    dailyRate: gear.dailyRate,
    rentalFee,
    securityDeposit,
    insuranceFee,
    totalPaid,
    status: 'Confirmed',
    handoverCode,
    conditionVerified: true,
    pickupLocation: pickupLocation || `${gear.location} (Standard Pickup Zone)`,
    createdAt: new Date().toISOString()
  };

  bookingStore.unshift(newBooking);
  res.status(201).json(newBooking);
});

// PATCH /api/bookings/:id/status - Update booking status
app.patch('/api/bookings/:id/status', (req, res) => {
  const { status } = req.body;
  const booking = bookingStore.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  booking.status = status;
  res.json(booking);
});

// GET /api/users - List users
app.get('/api/users', (req, res) => {
  res.json(userStore);
});

// POST /api/auth/login - Fast persona switch or login
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const user = userStore.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (user) {
    return res.json({ success: true, user });
  }
  // If not found, return demo renter
  res.json({ success: true, user: userStore[0] });
});

// POST /api/ai/scout - GearAI Advisor Kit Builder (Grounded in real catalog)
app.post('/api/ai/scout', (req, res) => {
  const { prompt } = req.body;
  const q = (prompt || '').toLowerCase();

  let matchedItems = [];
  let reply = '';
  let recommendations = [];

  // Match items based on query keywords
  if (q.includes('youtube') || q.includes('vlog') || q.includes('travel') || q.includes('creator')) {
    matchedItems = gearStore.filter(g => g.id === 'gear-1' || g.id === 'gear-3' || g.id === 'gear-4');
    reply = `🎬 For YouTube cinematic travel & vlogging, you need high dynamic range, crisp stabilization, and ultra-reliable 32-bit float audio that never clips. Here is your recommended Creator Kit!`;
    recommendations = [
      'Sony Alpha A7 IV (4K 60p 10-bit for cinematic b-roll)',
      'Sony FE 24-70mm f/2.8 GM II (All-in-one versatile standard zoom)',
      'RØDE Wireless PRO (32-bit float onboard recording prevents ruined takes)'
    ];
  } else if (q.includes('wedding') || q.includes('cinematic') || q.includes('film') || q.includes('movie')) {
    matchedItems = gearStore.filter(g => g.id === 'gear-7' || g.id === 'gear-8' || g.id === 'gear-5');
    reply = `🎥 For wedding or narrative cinema production, lighting and stabilization make 90% of the visual impact. Here is the recommended Hollywood Production Kit:`;
    recommendations = [
      'Blackmagic Pocket Cinema Camera 6K Pro (Gen 5 color science + internal ND filters)',
      'DJI RS 3 Pro Gimbal (Carbon fiber arms for smooth sweeping tracking shots)',
      'Aputure LS 300d II (Powerful key light with softbox for flattering skin tones)'
    ];
  } else if (q.includes('drone') || q.includes('aerial') || q.includes('outdoor')) {
    matchedItems = gearStore.filter(g => g.id === 'gear-2' || g.id === 'gear-1');
    reply = `🛸 For aerial photography and real estate showcases, the triple-camera DJI Mavic 3 Pro delivers telephoto compression that ordinary drones cannot achieve.`;
    recommendations = [
      'DJI Mavic 3 Pro Cine Kit (3 optical focal lengths + 43 min flight time)',
      'Sony Alpha A7 IV (Ground camera pairing for seamless color matching)'
    ];
  } else if (q.includes('podcast') || q.includes('audio') || q.includes('interview')) {
    matchedItems = gearStore.filter(g => g.id === 'gear-4');
    reply = `🎙️ For on-location interviews and multi-person podcasting, wireless freedom and backup recordings are essential.`;
    recommendations = [
      'RØDE Wireless PRO Kit (Dual transmitters with broadcast lavaliers + timecode)'
    ];
  } else if (q.includes('vr') || q.includes('game') || q.includes('demo')) {
    matchedItems = gearStore.filter(g => g.id === 'gear-6');
    reply = `🥽 For interactive client presentations, 3D spatial walkthroughs, or game development tests, the Meta Quest 3 is the top choice.`;
    recommendations = [
      'Meta Quest 3 512GB (Full color passthrough with elite battery headstrap)'
    ];
  } else {
    // General recommendation based on budget or rating
    matchedItems = gearStore.slice(0, 3);
    reply = `✨ I scanned our verified gear inventory! Based on popularity and creator satisfaction, here are our highest rated setups ready for immediate pickup.`;
    recommendations = matchedItems.map(g => `${g.title} ($${g.dailyRate}/day - ${g.condition})`);
  }

  // Calculate estimated daily bundle price
  const bundleDailyRate = matchedItems.reduce((sum, item) => sum + item.dailyRate, 0);

  res.json({
    reply,
    recommendations,
    bundleDailyRate,
    items: matchedItems,
    suggestedPrompts: [
      'Cinematic wedding shoot setup',
      'YouTube travel vlog kit under $60/day',
      'Aerial drone landscape coverage',
      'Clean audio kit for outdoor interviews'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 GearShare Backend REST API running on port ${PORT}`);
  console.log(`📍 Inventory loaded: ${gearStore.length} items ready.`);
});
