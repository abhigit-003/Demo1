# Raffine - Service Discovery Platform & Admin Panel

A modern React-based platform connecting users with premium spas, salons, fitness centers, and wellness services. This repository includes both the public landing page and a comprehensive Admin Panel module.

## 🚀 Features

### Public Platform
- 🏠 **Landing Page** - Beautiful welcome page with service highlights
- 🔐 **Authentication** - Login, Register, and Password Recovery
- 🔍 **Search & Filters** - Advanced filtering by category, price, rating
- ❤️ **Favorites & Cart** - Save services and manage bookings
- 📱 **Responsive Design** - Works seamlessly on all devices

### Admin Panel Module (`/admin/*`)
- 📊 **Dashboard** - Overview with real-time stats and charts
- 📦 **Management** - CRUD interfaces for Products, Destinations, and Coupons
- 💰 **Pricing Engine** - Dynamic pricing rules and category configuration
- 📈 **Analytics** - User journey funnel and conversion monitoring
- 📋 **Audit Logs** - Detailed system and user activity logging

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router v7** - Client-side routing
- **Vite 6** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Material Symbols & Lucide React** - Icon libraries
- **Axios** - HTTP client for API integration
- **Recharts** - Data visualization

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Demo1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## 📁 Project Structure

```
src/
├── app/                 # Root application structure & routing
├── components/          # Shared UI components
├── context/             # React Context providers (Auth, Cart, etc.)
├── features/
│   └── admin/           # Admin Panel module
├── pages/               # Main application pages
├── services/            # API services
└── styles/              # Global styles and Tailwind config
```

## 🔐 Admin Access

The Admin Panel is located at `/admin`. It requires an account with the `admin` role. Access control is enforced via the `AdminLayout` component.

---

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests
