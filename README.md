# Design UI/UX — Admin Panel Documentation

> Original Figma project: [Design UI/UX (Community)](https://www.figma.com/design/FSPOWShHtVL51S1BVebN6F/Design-UI-UX--Community-)

## Quick Start

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
```

---

## Admin Panel Module

The Admin Panel is a complete management interface located at `src/features/admin/`. Access it at `/admin/*`.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router v7 |
| HTTP Client | Axios (with interceptors) |
| Charts | Recharts |
| Icons | Lucide React |

---

## Directory Structure

```
src/features/admin/
├── components/
│   └── Toast.tsx              # Reusable success/error notifications
├── layout/
│   ├── AdminLayout.tsx        # Root layout + RBAC guard
│   ├── Sidebar.tsx            # Navigation sidebar (mobile-responsive)
│   └── TopNavbar.tsx          # Top header bar
├── pages/
│   ├── DashboardHome.tsx      # Overview dashboard with stats & charts
│   ├── ProductManager.tsx     # Product CRUD management
│   ├── DestinationHub.tsx     # Destination CRUD management
│   ├── PricingEngine.tsx      # Category pricing configuration
│   ├── PricingRules.tsx       # Dynamic pricing rules CRUD
│   ├── Coupons.tsx            # Coupon & flash sale management
│   ├── Analytics.tsx          # User behavior & analytics charts
│   └── UserLogs.tsx           # Admin audit log viewer
├── routes/
│   └── adminRoutes.tsx        # All /admin/* route definitions
└── services/
    └── adminAPI.ts            # Centralized Axios API service layer
```

---

## Routes

| URL | Page | Description |
|---|---|---|
| `/admin` | DashboardHome | Stats cards, revenue chart, recent activity |
| `/admin/products` | ProductManager | Product/service table with CRUD |
| `/admin/destinations` | DestinationHub | Destination cards with CRUD |
| `/admin/pricing-engine` | PricingEngine | Category pricing config (base price, min/max, margin, tax) |
| `/admin/pricing-rules` | PricingRules | Dynamic rules (demand, time, competitor-based) |
| `/admin/coupons` | Coupons | Coupon CRUD + Flash Sale launcher |
| `/admin/analytics` | Analytics | User journey, traffic sources, conversion monitoring |
| `/admin/user-logs` | UserLogs | Audit log with filters, search, pagination, CSV export |

---

## Access Control

The `AdminLayout` reads `user` from `localStorage` and enforces:

```ts
if (user.role !== "admin") redirect to "/"
```

Non-admin users are redirected to the home page automatically.

---

## API Service Layer (`adminAPI.ts`)

### Configuration
- **Base URL:** reads from `VITE_API_URL` env var, falls back to `http://localhost:3000/api`
- **Timeout:** 15 seconds
- **JWT:** `Authorization: Bearer <token>` attached via request interceptor

### 401 Auto-Logout
```ts
// Any 401 response across the entire app:
localStorage.removeItem('token');
localStorage.removeItem('user');
window.location.href = '/login';
```

### Available Functions

| Function | Method | Endpoint |
|---|---|---|
| `getDashboardStats()` | GET | `/admin/dashboard-stats` |
| `getProducts()` | GET | `/admin/products` |
| `createProduct(data)` | POST | `/admin/products` |
| `updateProduct(id, data)` | PUT | `/admin/products/:id` |
| `deleteProduct(id)` | DELETE | `/admin/products/:id` |
| `getDestinations()` | GET | `/admin/destinations` |
| `createDestination(data)` | POST | `/admin/destinations` |
| `updateDestination(id, data)` | PUT | `/admin/destinations/:id` |
| `deleteDestination(id)` | DELETE | `/admin/destinations/:id` |
| `getCoupons()` | GET | `/admin/coupons` |
| `createCoupon(data)` | POST | `/admin/coupons` |
| `updateCoupon(id, data)` | PUT | `/admin/coupons/:id` |
| `deleteCoupon(id)` | DELETE | `/admin/coupons/:id` |
| `launchFlashSale(data)` | POST | `/admin/flash-sale` |
| `getPricingRules()` | GET | `/admin/pricing-rules` |
| `createPricingRule(data)` | POST | `/admin/pricing-rules` |
| `updatePricingRule(id, data)` | PUT | `/admin/pricing-rules/:id` |
| `deletePricingRule(id)` | DELETE | `/admin/pricing-rules/:id` |
| `getPricingEngine()` | GET | `/admin/pricing-engine` |
| `savePricingEngine(config)` | PUT | `/admin/pricing-engine` |
| `getAnalytics()` | GET | `/admin/analytics` |
| `getUserLogs(params)` | GET | `/admin/user-logs` |
| `exportUserLogs()` | GET | `/admin/user-logs/export` (blob) |

---

## Page-by-Page Features

### DashboardHome
- Fetches live stats from API on mount
- Stat cards with skeleton loading placeholders
- Revenue line chart (Recharts)
- Sales by category pie chart
- Recent activity feed
- Quick Action buttons navigate to Products / Destinations / Pricing Rules
- Refresh button re-fetches all data

### ProductManager
- Table view with search, status filter, type tabs, sort (name/price/stock)
- **Add Product** — modal with name, category, type, price, stock, status fields
- **Edit Product** — pre-filled modal, saves via `updateProduct()`
- **Delete** — confirmation dialog before `deleteProduct()`
- **Toggle Visibility** — toggle switch calls `updateProduct({ status })`
- Optimistic UI updates with rollback on API failure
- Loading spinner while fetching

### DestinationHub
- Card grid layout (vs table) showing region, tier, capacity bar, price
- Tier summary cards (Elite / Standard / Budget) with revenue totals
- Region + Tier filter dropdowns
- **Add Destination** modal
- **Edit Destination** modal with all fields
- **Restrict / Activate** button per card calls `updateDestination({ status })`
- **Delete** with confirmation dialog
- Loading spinner + error warning banner

### PricingEngine
- Fetches config from `getPricingEngine()` on mount
- **Category Configuration** — editable Base Price, Min, Max, Margin, Tax for Products / Destinations / Services
- **Save All Changes** — calls `savePricingEngine()` with loading state + toast
- **Reset to Defaults** — restores hardcoded defaults + toast
- **Ongoing Discounts** table — lists active/scheduled discounts with revenue impact
- **Global Pricing Rules** — controlled dropdowns (Before/After Tax, Rounding, Strikethrough toggle)
- Mobile-scrollable discount table (`min-w-[640px]`)

### PricingRules
- Fetches rules from `getPricingRules()` on mount
- Rules displayed as detail cards (condition, adjustment, applied to)
- **Create Rule** modal — name, type (demand/time/competitor), condition, adjustment, apply to
- **Edit Rule** — opens pre-filled modal
- **Delete** with confirmation dialog
- **Active / Paused toggle** per rule calls `updatePricingRule({ status })`
- **Engine Configuration** panel — price floor/ceiling, max %, frequency, save via `savePricingEngine()`
- **Manual Override** input section

### Coupons
- Coupon cards with usage progress bars
- **Create / Edit** modal — code, type (% or fixed), value, description, usage limit, expiry, apply-to, stackable
- **Delete** with confirmation dialog
- **Copy to Clipboard** button per coupon
- **Flash Sale** launcher — configurable discount amount, duration, apply-to — calls `launchFlashSale()`
- Summary stat cards (active count, total uses, scheduled, revenue)

### Analytics
- Fetches all data from `getAnalytics()` on mount
- Metric cards (Visitors, Page Views, Conversion Rate, Session Time) with skeleton loading
- **User Journey funnel** bar chart with drop-off indicators
- **Top Destination Interactions** ranked list with conversion bars
- **Traffic Sources** pie chart
- **Conversion Rate Monitoring** dual-line chart (baseline vs. coupon)
- **Pathfinder Behavior** table with conversion rate bars
- **Critical Exit Points** ranked list with bar indicators
- Date range selector triggers re-fetch

### UserLogs
- Fetches from `getUserLogs({ page, category, severity, search })` on mount
- **Search** — re-fetches on every filter change
- **Category filter** (Product / Destination / Pricing / Coupon / System)
- **Severity filter** (Info / Warning / Critical)
- **Pagination** — Previous / numbered / Next buttons update page state and re-fetch
- **Export Logs** — downloads CSV blob from `exportUserLogs()`
- Timeline view with severity icons, category badges, user + IP info

---

## Shared Components

### `Toast.tsx`
- Positioned fixed bottom-right
- Auto-dismisses after **3.5 seconds**
- Types: `success` (green) or `error` (red)
- Includes manual ✕ close button

### Error & Loading Patterns (applied on every page)
| Pattern | Implementation |
|---|---|
| **Loading** | `<Loader2 className="animate-spin" />` shown while `isLoading === true` |
| **Skeleton** | `animate-pulse` placeholder divs for stat cards (Dashboard, Analytics) |
| **API Error** | Yellow warning banner + graceful fallback to built-in mock data |
| **Delete confirm** | Custom modal: "Cannot be undone" → Cancel / Delete buttons |
| **Save in-flight** | Button disabled + spinner while `isSaving === true` |

---

## Sidebar (Mobile Responsive)
- Fixed sidebar on desktop (`md:static`)
- Slide-in overlay on mobile (`translate-x-full` → `translate-x-0`)
- Hamburger button toggles between ☰ and ✕
- Clicking any nav link **closes** the sidebar automatically on mobile
- Mobile backdrop click closes sidebar
- **Logout** button: clears `token` + `user` from `localStorage`, navigates to `/login`

---

## Backend API Requirements

The frontend expects a REST API at `VITE_API_URL` (default: `http://localhost:3000/api`). All admin endpoints require a valid `Authorization: Bearer <token>` header.

Set your backend URL:
```bash
# .env
VITE_API_URL=http://localhost:3000/api
```

**Expected response shape for list endpoints:**
```json
{ "data": [...] }
```
or plain array `[...]` — the service layer passes through `response.data`.

---

## Build Verification

```bash
npm run build
# ✔ built in ~7.4s   Exit code: 0
```

Zero TypeScript errors, zero unused-import errors verified.