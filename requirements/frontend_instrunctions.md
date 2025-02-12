# WedSpace Frontend Documentation

## Project Overview
WedSpace is an online platform that simplifies wedding and event venue bookings in India. It connects users with venues and vendors through an intuitive interface, combining online discovery with assisted booking for a seamless experience. The frontend is designed to be visually appealing, user-friendly, and responsive, following the established red and amber color scheme.

## Feature Requirements

### 1. Homepage
- Full-screen wedding image with a search bar for venues and vendors.
- Scrolling down displays venue suggestions in card format with key details.
- Aesthetic red and amber color scheme with hover effects.
- Logo positioned at the top left.
- Navigation buttons linking to relevant pages.

### 2. Venue & Vendor Listings
- Filters for location, price, and availability.
- Vendor pages with detailed descriptions, pricing, and booking options.
- Interactive map integration to visualize venue locations.

### 3. Booking System
- Hybrid booking approach (online discovery + assisted booking).
- Inquiry form for users to request more details or schedule visits.
- Integration with an API for availability checks.

### 4. User Dashboard
- Profile management for both customers and vendors.
- Saved venues and past inquiries/bookings.
- Messaging system to communicate with venue managers.

### 5. Admin & Vendor Portal
- Venue managers can update listings, pricing, and availability.
- Vendor management system for services like catering, decor, etc.

### 6. General
- Mobile-first responsive design.
- Fast-loading pages optimized for performance.
- Accessible UI with easy navigation.
- Integration with backend services through API calls.

## Technology Stack

### Frontend (SEO-Optimized & Free)
- **Next.js (React Framework)**: Best for SEO with SSR & SSG, free on Vercel.
- **Tailwind CSS**: For efficient and responsive styling.
- **Shadcn/ui**: Free high-quality UI components.
- **Framer Motion**: Free smooth animations.

### Backend (100% Free & Scalable)
- **Supabase (PostgreSQL + Authentication)**: Free database, auth, and real-time data.
- **Vercel Edge Functions**: Free API serverless backend.
- **Zapier (Automation)**: Free for 100 tasks/month.
- **Google Maps API**: Free up to 28,000 loads/month (requires billing setup, but no charges within free limits).


## Current Docs & File Structure
MY-APP/
├── .next/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── hooks/
├── lib/
├── node_modules/
├── public/
├── requirements/
│   └── frontend_instrunctions.md
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json


This structure ensures modularity and ease of expansion. Each section of the project will be built iteratively, ensuring a smooth user experience and maintainability.

---

**Next Steps:**
- Set up Next.js project and deploy to Vercel.
- Implement UI components following the design system.
- Integrate Supabase for authentication and data management.
- Set up Zapier workflows for automation.
- Develop booking and user management features.
- Optimize performance and ensure cross-browser compatibility.

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified
- All new pages go in /app
