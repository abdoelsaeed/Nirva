# 🛍️ NIRVA FASHION - E-Commerce Platform

![NIRVA Logo](Frontend/public/logo2.png)

> **Nirva - Wear Your Confidence**
>
> A full-stack modern e-commerce platform built with React, Node.js, and MongoDB. Features a responsive design, advanced product filtering, wishlist management, secure authentication, and an intuitive admin dashboard.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Features Guide](#features-guide)
- [Admin Dashboard](#admin-dashboard)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

NIRVA Fashion is a complete e-commerce solution designed for fashion retailers. It provides:

- **Customer-facing store** with product browsing, filtering, and purchasing
- **Admin dashboard** for product management
- **User authentication** with JWT tokens
- **Order management** system
- **Wishlist functionality** for saving favorite items
- **Shopping cart** with persistent storage
- **Responsive design** for mobile and desktop

The platform is built with modern web technologies and follows best practices for security, performance, and user experience.

---

## ✨ Features

### 👥 Customer Features

- ✅ **Product Browsing**
  - View all products with detailed information
  - Filter by category (Men, Women, Coming Soon)
  - Search products by name or description
  - View product images and specifications

- ✅ **User Account**
  - User registration and authentication
  - Profile management
  - Address management
  - Order history with status tracking

- ✅ **Shopping**
  - Add products to cart with size and color selection
  - Persistent cart storage (localStorage)
  - Wishlist functionality
  - Save items for later

- ✅ **Checkout & Payment**
  - Order creation with customer details
  - Order status tracking (Pending, Confirmed, Shipped, Delivered, Returned)
  - Order history with detailed items
  - Guest checkout support

- ✅ **User Experience**
  - Responsive design (Mobile, Tablet, Desktop)
  - Smooth animations with Framer Motion
  - Real-time toast notifications
  - Loading states and error handling

### 👨‍💼 Admin Features

- ✅ **Product Management**
  - Create new products with images
  - Edit existing products
  - Delete products
  - Manage product variants (sizes, colors)
  - Upload images to Cloudinary

- ✅ **Dashboard**
  - Admin overview
  - Product management interface
  - Delete product interface

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Library | 18+ |
| Vite | Build Tool | Latest |
| Tailwind CSS | Styling | Latest |
| React Router | Navigation | 6+ |
| Redux | State Management | Latest |
| Axios | HTTP Client | Latest |
| Framer Motion | Animations | Latest |
| React Hot Toast | Notifications | Latest |
| Lucide React | Icons | Latest |

### **Backend**
| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | Runtime | 14+ |
| Express.js | Web Framework | 4+ |
| MongoDB | Database | Latest |
| Mongoose | ODM | Latest |
| JWT | Authentication | Latest |
| Bcryptjs | Password Hashing | Latest |
| Cloudinary | Image Upload | Latest |
| Multer | File Upload | Latest |
| Validator | Input Validation | Latest |

### **DevOps & Deployment**
- Railway (Backend)
- Vercel (Frontend)
- Cloudinary (Image Storage)
- MongoDB Atlas (Database)

---

## 📁 Project Structure

```
NIRVA/
├── Frontend/                          # React Frontend Application
│   ├── src/
│   │   ├── assets/                   # Images, fonts, static files
│   │   ├── components/               # Reusable components
│   │   ├── features/                 # Feature modules (cart, auth, etc.)
│   │   │   ├── cart/
│   │   │   ├── dashboard/
│   │   │   ├── home/
│   │   │   ├── products/
│   │   │   ├── user/
│   │   │   └── wishlist/
│   │   ├── pages/                    # Page components
│   │   │   ├── Cart.jsx
│   │   │   ├── ComingSoon.jsx
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── GetMyOrders.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Men.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ProductDetials.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   └── Women.jsx
│   │   ├── services/                 # API calls
│   │   │   ├── axiosClient.js
│   │   │   ├── authApi.js
│   │   │   ├── cartApi.js
│   │   │   ├── orderApi.js
│   │   │   ├── productApi.js
│   │   │   ├── userApi.js
│   │   │   └── wishlistApi.js
│   │   ├── store/                    # Redux store
│   │   ├── ui/                       # UI components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                       # Public assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── .env
│
└── Backend/                           # Node.js/Express Backend
    ├── controller/                   # Route controllers
    │   ├── auth.controller.js
    │   ├── cart.controller.js
    │   ├── category.controller.js
    │   ├── error.controller.js
    │   ├── orders.controller.js
    │   ├── product.controller.js
    │   ├── users.controller.js
    │   └── wishList.controller.js
    ├── DB/
    │   └── connectionDB.js           # MongoDB connection
    ├── error/                        # Error handling
    │   ├── catchAsyn.js
    │   └── err.js
    ├── models/                       # Mongoose schemas
    │   ├── categories.Model.js
    │   ├── cart.Model.js
    │   ├── orders.Model.js
    │   ├── product.Model.js
    │   ├── user.Model.js
    │   └── wishList.Model.js
    ├── routes/                       # Express routes
    │   ├── auth.routes.js
    │   ├── cart.routes.js
    │   ├── category.routes.js
    │   ├── orders.routes.js
    │   ├── product.routes.js
    │   ├── users.routes.js
    │   └── wishList.routes.js
    ├── utils/                        # Utilities
    │   ├── cloudinary.js
    │   └── multer.js
    ├── app.js
    ├── server.js
    ├── package.json
    ├── vercel.json
    ├── .env
    └── .gitignore
```

---

## 📋 Prerequisites

Before installation, ensure you have:

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** v6 or higher
- **MongoDB Atlas** account ([Create Account](https://www.mongodb.com/cloud/atlas))
- **Cloudinary** account ([Sign Up](https://cloudinary.com/))
- **Git** for version control

### Verify Installation

```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/nirva-fashion.git
cd nirva-fashion
```

### Step 2: Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables (see Configuration section)
```

### Step 3: Backend Setup

```bash
cd ../Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables (see Configuration section)
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the Backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nirva?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_BASE_URL=http://localhost:3000/api/v1/
# or for production:
# VITE_BASE_URL=https://your-backend-domain.com/api/v1/
```

### Configuration Details

**MONGODB_URI**: Connection string from MongoDB Atlas
- Create cluster at mongodb.com/cloud/atlas
- Get connection string from "Connect" button
- Replace `<username>` and `<password>` with your credentials

**JWT_SECRET**: Generate with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**CLOUDINARY**: 
- Sign up at cloudinary.com
- Get credentials from "Account Details"
- Create a folder named "users" and "products" for organization

---

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Backend Server

```bash
cd Backend
npm run dev
# or
npm start
```

Backend runs at: `http://localhost:3000`

#### Terminal 2 - Frontend Server

```bash
cd Frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Production Build

#### Backend
```bash
cd Backend
npm start
```

#### Frontend
```bash
cd Frontend
npm run build
npm run preview
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/signup` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login user | ❌ |
| POST | `/api/v1/auth/logout` | Logout user | ✅ |
| GET | `/api/v1/auth/me` | Get current user | ✅ |
| PATCH | `/api/v1/auth/updatePassword` | Update password | ✅ |

### Product Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/products` | Get all products | ❌ |
| GET | `/api/v1/products/:id` | Get product by ID | ❌ |
| POST | `/api/v1/products/search` | Search products | ❌ |
| POST | `/api/v1/products` | Create product | ✅ Admin |
| PATCH | `/api/v1/products/:id` | Update product | ✅ Admin |
| DELETE | `/api/v1/products/:id` | Delete product | ✅ Admin |

### Order Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/orders/me` | Get user orders | ✅ |
| POST | `/api/v1/orders` | Create order | ✅ |
| GET | `/api/v1/orders/:id` | Get order details | ✅ |

### Wishlist Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/wishlist/me` | Get user wishlist | ✅ |
| POST | `/api/v1/wishlist/:id` | Add to wishlist | ✅ |
| DELETE | `/api/v1/wishlist/delete/:id` | Remove from wishlist | ✅ |

### Cart Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/cart/me` | Get user cart | ✅ |
| POST | `/api/v1/cart` | Add to cart | ✅ |
| DELETE | `/api/v1/cart/:id` | Remove from cart | ✅ |

---

## 🔐 Authentication

### JWT Flow

```
1. User registers/logs in
   └─> Server generates JWT token
   └─> Token stored in localStorage
   └─> Token sent in Authorization header

2. Request flow
   └─> Client: Authorization: Bearer <token>
   └─> Server: Verify token
   └─> Server: Process request if valid

3. Token expiration
   └─> 7 days (configurable via JWT_EXPIRE)
   └─> Auto logout on expiration
```

### Protected Routes

Frontend routes protected with `ProtectedRoute`:
- `/profile` - User profile (logged in users)
- `/cart` - Shopping cart (logged in users)
- `/my-orders` - Order history (logged in users)
- `/wishlist` - Wishlist (logged in users)
- `/dashboard/*` - Admin panel (admin users only)

---

## 📤 File Upload

### Implementation

Files are uploaded to Cloudinary using:
- **Multer** for handling multipart form data
- **Streamifier** for converting buffer to stream
- **Cloudinary API** for cloud storage

### Upload Process

```javascript
1. User selects file
2. Multer stores in memory
3. Streamifier converts to stream
4. Cloudinary stores and returns URL
5. URL saved in database
6. Image accessible via URL
```

### Supported File Types
- JPEG, PNG, WebP, GIF
- Maximum size: 100MB

---

## 🗄️ Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  address: String,
  photo: String,
  photoPublicId: String,
  password: String (hashed),
  role: "user" | "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  category: ObjectId (ref: Category),
  description: String,
  price: Number,
  imageCover: String,
  images: [String],
  variants: [{
    color: String,
    sizes: [String]
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  user_id: ObjectId (ref: User),
  is_guest: Boolean,
  customer_name: String,
  customer_phone: String,
  address: String,
  status: "pending" | "confirmed" | "shipped" | "delivered" | "returned",
  orderItems: [{
    productId: ObjectId,
    quantity: Number,
    color: String,
    size: String
  }],
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Wishlist Model
```javascript
{
  user_id: ObjectId (ref: User),
  products: [ObjectId] (ref: Product),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Features Guide

### Product Filtering

Products can be filtered by:
- **Category** (Men, Women, Coming Soon)
- **Search Query** (name, description)
- **Price Range** (optional)

### Order Status

Orders progress through states:
- 🟡 **Pending** - Order created, awaiting confirmation
- 🔵 **Confirmed** - Order confirmed by admin
- 📦 **Shipped** - Order sent to customer
- ✅ **Delivered** - Order received by customer
- ↩️ **Returned** - Order returned by customer

### Shopping Cart

- Items stored in localStorage
- Persists across sessions
- Includes quantity, size, color
- Real-time total calculation

### Wishlist

- Save items for later
- Add/remove items quickly
- View all saved products
- Add to cart directly from wishlist

---

## 👨‍💼 Admin Dashboard

### Access

1. Login with admin account
2. Navigate to `/dashboard`
3. Features available:
   - Product management
   - Product deletion
   - View dashboard statistics

### Product Management

**Create Product**
- Fill product details
- Upload cover image
- Upload additional images (up to 5)
- Set variants (colors and sizes)
- Set price

**Edit Product**
- Update any product details
- Change images
- Modify variants
- Update pricing

**Delete Product**
- Select product ID
- Confirm deletion
- Product removed from catalog

---

## 🚀 Deployment

### Backend Deployment (Railway)

1. Push code to GitHub
2. Connect Railway to GitHub repository
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

```bash
# Manual deployment via Railway CLI
railway login
railway link
railway up
```

Railway URL: `https://your-project.up.railway.app`

### Frontend Deployment (Vercel)

1. Connect Vercel to GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy on push automatically

```bash
# Manual deployment via Vercel CLI
npm install -g vercel
vercel login
vercel --prod
```

### Environment Variables in Production

**Backend (Railway)**
```
MONGODB_URI=your_production_mongodb
JWT_SECRET=your_production_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

**Frontend (Vercel)**
```
VITE_BASE_URL=https://your-backend.up.railway.app/api/v1/
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. **CORS Error**
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check backend CORS configuration in `app.js`
- Ensure frontend URL is whitelisted
- Use proxy in `vite.config.js` for development

#### 2. **JWT Token Expired**
```
Error: Token expired
```
**Solution:**
- Auto-logout and redirect to login
- User needs to login again
- Check JWT_EXPIRE in backend .env

#### 3. **Image Upload Fails**
```
Error: Cloudinary upload failed
```
**Solution:**
- Verify Cloudinary credentials
- Check file size (max 100MB)
- Ensure folders exist in Cloudinary

#### 4. **Database Connection Error**
```
Error: Cannot connect to MongoDB
```
**Solution:**
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database exists

#### 5. **Port Already in Use**
```
Error: EADDRINUSE: address already in use :::3000
```
**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000
```

#### 6. **Module Not Found**
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Contributing

### Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

### Code Style

- Use ESLint configuration in project
- Follow Prettier formatting
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Team & Contact

**Project**: NIRVA Fashion E-Commerce
**Created**: 2024
**Status**: Active Development

For support or inquiries:
- 📧 Email: support@nirvafashion.com
- 🌐 Website: www.nirvafashion.com
- 🐛 Issues: GitHub Issues

---

## 🙏 Acknowledgments

- React community for amazing libraries
- Express.js documentation
- MongoDB for flexible database
- Cloudinary for reliable image hosting
- Tailwind CSS for utility-first design

---

<div align="center">

**Made with ❤️ by the NIRVA Team**

⭐ If you found this helpful, please star the repository!

</div>
