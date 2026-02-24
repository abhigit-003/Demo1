# Raffine - Service Discovery Platform

A modern React-based frontend for Raffine - a premium service discovery platform connecting users with spas, salons, fitness centers, and wellness services.

## 🚀 Features

- 🏠 **Landing Page** - Beautiful welcome page with service highlights
- 🔐 **Authentication** - Login, Register, and Password Recovery
- 🏡 **Home Page** - Browse and discover premium services
- 🔍 **Search & Filters** - Advanced filtering by category, price, rating
- ❤️ **Favorites** - Save your favorite services
- 🛒 **Shopping Cart** - Add services to cart
- 👤 **User Profile** - Manage account and preferences
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router v7** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material Symbols** - Icon library

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raffine-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── ProfileDropdown.jsx
│   │   └── MobileSearch.jsx
│   ├── pages/           # Page components
│   │   ├── Welcome.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Terms.jsx
│   │   └── Privacy.jsx
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── FavoritesContext.jsx
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔐 Authentication

The app includes a complete authentication system:
- User registration with validation
- Login with remember me functionality
- Password recovery
- Protected routes
- Session management with localStorage

## 🎨 Features

### Search & Filter
- Real-time search functionality
- Filter by service type, price range, and rating
- Sort by price, rating, or recommendations
- Mobile-friendly search interface

### Shopping Cart
- Add services to cart
- Persistent cart storage
- Item count display
- Ready for checkout integration

### Favorites
- Save favorite services
- Persistent favorites storage
- Quick access from profile

## 🔄 State Management

The app uses React Context for state management:
- **AuthContext** - User authentication state
- **CartContext** - Shopping cart state
- **FavoritesContext** - Favorites state

All state is persisted in localStorage for offline functionality.

## 🌐 Routes

- `/` - Welcome page
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/home` - Main services page (protected)
- `/terms` - Terms and Conditions
- `/privacy` - Privacy Policy

## 🔌 Backend Integration

Currently, the frontend uses mock data and localStorage. To integrate with a backend:

1. Update API calls in:
   - `src/pages/Login.jsx`
   - `src/pages/Register.jsx`
   - `src/context/AuthContext.jsx`

2. Replace localStorage with API calls
3. Add API configuration file
4. Implement error handling for API responses

## 📝 Development Notes

- All forms include comprehensive validation
- Error messages are user-friendly
- Loading states for async operations
- Responsive design for all screen sizes
- Dark theme optimized UI

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the Raffine platform.

## 👥 Team

For questions or support, contact the development team.
