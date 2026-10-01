# GearShare ⚡ — Peer-to-Peer Creative Gear & Gadget Rental Platform

A modern, full-stack, production-grade web application built to connect filmmakers, photographers, content creators, and tech enthusiasts. Rent top-tier cinema cameras, drones, 32-bit float audio gear, lenses, lighting, and VR headsets with digital escrow deposit security, 6-point condition inspection handovers, and an intelligent **GearAI Scout** grounded in the live equipment catalog.

---

## 🌟 Key Features & Highlights

| Feature Area | Implementation Details |
|---|---|
| **Multi-Persona Roles** | Instant 1-click persona switcher supporting **Renter**, **Verified Lender**, and **Platform Admin** with dedicated dashboards. |
| **Grounded AI Assistant** | **GearAI Scout 🤖** — analyzes project requirements (e.g. YouTube vlogs, wedding shoots, podcast interviews) and recommends complete equipment bundles directly from available catalog stock with estimated bundle rates and 1-click booking. |
| **Interactive Rental Calculator** | Real-time date-range duration calculator with automatic computation of daily rates, refundable escrow security deposits, and platform damage protection fees. |
| **Digital Handover & Inspection** | **6-Point Condition Verification Tool** for optical cleanliness, gimbal mechanics, battery health, card speed, and electronic signature sign-off before releasing gear. |
| **Lender Studio** | Full equipment management suite to list gear, toggle instant availability, monitor rental requests, and track revenue earnings. Includes pre-loaded 1-click cinema presets (Sony FX3, DJI Avata 2, Shure SM7B). |
| **Admin Console** | Platform analytics dashboard tracking gross escrow handled, commission cuts (10%), category breakdowns, active rental field tracking, user directory, and listing moderation. |
| **Zero-Configuration Backend** | Robust Express.js REST API with automatic detection of local MongoDB + instant in-memory fallback pre-seeded with realistic creator equipment and reviews. |
| **Glassmorphism UI/UX** | Built with Tailwind CSS, custom glass card aesthetics, Dark & Light theme switching with localStorage persistence, and responsive mobile drawers. |

---

## 🚀 Quick Start Guide

### Option A: One-Click Launch (Windows)
Double-click `run-dev.bat` in the `gearshare-rental-platform` directory. It will automatically start both the backend API and frontend dev server!

---

### Option B: Manual Launch

#### 1. Start the Backend REST API
```bash
cd backend
npm install
npm start
```
*The API will start on `http://localhost:5002`.*

To enable Contact form email delivery, copy `backend/.env.example` to `backend/.env` and fill in the SMTP account settings. For Gmail, use a Google App Password for `SMTP_PASS`, not your regular account password. Set `CONTACT_TO_EMAIL` to the inbox that should receive messages.

#### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:3001`.*

---

## 👥 Demo Personas (Pre-Configured)

You can easily switch between all 3 personas using the profile dropdown in the top-right navbar:

1. **Renter (Kavya Patel)**
   - Role: Creative Director & Renter
   - City: Bengaluru
   - Capabilities: Browse catalog, filter by city/price, test GearAI Scout, book rentals, access digital handover PINs (`GS-xxxx`), and track deposit refunds.

2. **Lender (Dhayanandham A.)**
   - Role: ECE Engineer & Filmmaker
   - City: Puducherry
   - Capabilities: Access Lender Studio, toggle availability of cinema rigs, view incoming booking requests, and list new equipment.

3. **Platform Admin (Administrator)**
   - Role: System Operator & Trust Escrow Officer
   - Capabilities: View global KPIs, inspect all gear listings, resolve disputes, release escrow deposits, and manage users.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Glassmorphism design system.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose) with In-Memory fallback.
- **Security & Escrow:** Digital handover tokens, refundable deposit trust calculations, 6-point condition verification.
- **AI Engine:** Grounded natural-language project kit builder matching live inventory.
