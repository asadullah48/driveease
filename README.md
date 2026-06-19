# 🚗 DriveEase — Car Rental Platform

> Cross-platform car rental solution serving European markets. Available on iOS, Android, and Web.

![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## 📱 Platforms
| Platform | Status |
|----------|--------|
| iOS App | ✅ Live |
| Android App | ✅ Live |
| Web App | ✅ Live |

## ✨ Features
- 🔍 Smart Search — filter by location, date, car type, price
- 🚘 Car Catalog — 500+ vehicles with real-time availability
- 📅 Instant Booking — book in under 60 seconds
- 💳 Stripe Payments — EUR, GBP, USD support
- 📍 GPS Pickup — live map for pickup/dropoff
- 🔔 Push Notifications — booking confirmations and updates
- ⭐ Reviews and Ratings — verified post-rental reviews

## 🏗️ Architecture
\\\
driveease/
├── apps/
│   ├── mobile/     # React Native (Expo) — iOS & Android
│   └── web/        # Next.js 14 — Web platform
├── packages/shared/ # Shared types, utils, constants
└── backend/        # FastAPI + PostgreSQL
\\\

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Mobile | React Native 0.73 + Expo SDK 50 |
| Web | Next.js 14 + Tailwind CSS |
| Backend | FastAPI + Python 3.11 |
| Database | PostgreSQL 15 + SQLAlchemy |
| Payments | Stripe (EUR/GBP/USD) |
| Maps | Google Maps API |

## 🚀 Getting Started

### Backend
\\\ash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
\\\

### Mobile
\\\ash
cd apps/mobile
npm install
npx expo start
\\\

## 🌍 Market Coverage
🇬🇧 UK · 🇩🇪 Germany · 🇫🇷 France · 🇳🇱 Netherlands · 🇪🇸 Spain

## 👨‍💻 Developer
**Asadullah Shafique** — [@asadullah48](https://github.com/asadullah48)
