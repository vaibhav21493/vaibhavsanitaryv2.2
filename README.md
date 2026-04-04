# Vaibhav Sanitary - Complete House-Building Partner

A modern e-commerce platform for sanitary ware, plumbing materials, and construction supplies, built with React, TypeScript, and Supabase.

## 🏠 Features

### 🛍️ **Customer Experience**
- **Product Catalog**: Browse extensive collection of sanitary ware, plumbing, and construction materials
- **Bilingual Support**: English and Hindi language toggle
- **Wishlist Management**: Save products for later purchase
- **Shopping Cart**: Full cart functionality with quantity controls
- **Product Recommendations**: Smart suggestions based on cart items
- **Customer Reviews**: Platform review bar with ratings
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🔐 **Authentication & Security**
- **Multiple Login Methods**: 
  - Google OAuth
  - Email Magic Link (passwordless)
- **Secure Admin Panel**: Protected admin dashboard
- **Customer Profiles**: Save personal information and contact details
- **Protected Routes**: Login required for product inquiries

### 📋 **Product Inquiry System**
- **WhatsApp Integration**: Direct WhatsApp click-to-chat for inquiries
- **Website Inquiries**: Form-based product requests with authentication
- **Inquiry Management**: Track all customer requests and product details
- **Customer Data**: Complete customer information storage

### 🛠️ **Admin Dashboard**
- **Product Management**: Add, edit, delete products dynamically
- **Customer Management**: View all registered customers and profiles
- **Inquiry Tracking**: Monitor all product requests with details
- **Real-time Statistics**: Customer and inquiry analytics
- **Secure Access**: Admin-only protected by email allowlist

## 🚀 Technology Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **Lucide React** for icons

### **Backend & Database**
- **Supabase** (PostgreSQL) for:
  - Authentication & User Management
  - Database (Products, Customers, Inquiries)
  - Real-time subscriptions
  - File storage (product images)

### **Development Tools**
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** for CSS processing
- **Git** for version control

## 📁 Project Structure

```
vaibhav-sanitary/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard
│   │   ├── auth/            # Authentication pages
│   │   ├── cart/            # Shopping cart page
│   │   ├── components/      # Reusable UI components
│   │   ├── nav/             # Navigation and product pages
│   │   ├── request/         # Product inquiry system
│   │   ├── shop/            # Shopping context and state
│   │   ├── App.tsx          # Main application
│   │   └── RouterApp.tsx    # Routing configuration
│   ├── components/ui/       # UI component library
│   ├── styles/              # Global styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── supabase_*.sql          # Database setup scripts
└── README.md               # This file
```

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/vaibhav-sanitary.git
cd vaibhav-sanitary
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **4. Database Setup**
Run the SQL scripts in your Supabase SQL Editor:

1. **Products Table & Policies**: `supabase_products_backend.sql`
2. **Admin Views**: `supabase_admin_views.sql`

### **5. Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### **Admin Access**
- Default admin email: `pamartipranathi55@gmail.com`
- Change this in `src/app/admin/AdminPage.tsx` (line 46)
- Admin panel accessible at `/admin` when logged in

### **WhatsApp Integration**
- Default number: `+91 9667866899`
- Update in `src/app/components/CartWishlistSheet.tsx` (line 82)

### **Customization**
- **Colors**: Modify `tailwind.config.js`
- **Products**: Update `src/app/nav/navTree.ts`
- **Styling**: Edit components in `src/styles/`

## 📱 Features Overview

### **For Customers**
1. **Browse Products**: Navigate through categories
2. **Search & Filter**: Find specific products easily
3. **Wishlist**: Save favorite items
4. **Cart Management**: Add/remove items with quantity controls
5. **Multi-language**: Switch between English and Hindi
6. **Contact Options**: WhatsApp or website inquiries

### **For Admins**
1. **Product Management**: Full CRUD operations
2. **Customer Analytics**: Track registrations and activity
3. **Inquiry Management**: View all customer requests
4. **Real-time Updates**: Live data synchronization
5. **Secure Access**: Email-based authentication

## 🔒 Security Features

- **Environment Variables**: All secrets in `.env.local` (gitignored)
- **Row Level Security**: Supabase RLS policies for data protection
- **Admin Authentication**: Email-based admin access control
- **Input Validation**: Form validation and sanitization
- **Secure Routes**: Protected admin and account pages

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Deployment Options**
- **Vercel**: Recommended for React apps
- **Netlify**: Static site hosting
- **AWS S3 + CloudFront**: Custom setup
- **DigitalOcean App Platform**: Full-stack hosting

## 📊 Database Schema

### **Tables**
- `products` - Product catalog with admin management
- `profiles` - Customer profile information
- `inquiries` - Customer product requests
- `inquiry_items` - Products requested per inquiry

### **Views**
- `customer_details` - Customer information with profiles
- `inquiries_with_items` - Inquiries with product details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for Vaibhav Sanitary.

## 📞 Contact

- **Business**: Vaibhav Sanitary
- **Phone**: +91 6377307050, +91 9462656996
- **Location**: Kapasan Road, Narpat Ki Kheri, Chittorgarh
- **Email**: pamartipranathi55@gmail.com

---

🏠 **"From Foundation to Finish — Everything Under One Roof"**
