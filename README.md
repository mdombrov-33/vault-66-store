#  Vault-66 Store
A Fallout-inspired e-commerce store built with modern full-stack tools and a retro-futuristic UI. Buy Wasteland gear with bottle caps, chat with a terminal–styled AI assistant, and manage store inventory with an intuitive admin dashboard.

---


## 🔴 Live Demo
➡️ https://next-store-sigma-lilac.vercel.app/

![AI Assistant Demo](./public/vault-assistant.gif)

---

## 🔐 Test Admin Access

> You can log in as a test admin to explore the full admin dashboard (product creation, deletion, etc.).

Test Admin Credentials:
- Email: controlvault66@gmail.com
- Password: vaultcontrol66!

## ✨ Features

- 🔐 **Clerk Auth Integration**
  - Role-based access: regular users, main admin, test admin
  - Route protection using `clerkMiddleware`

- 🛒 **E-Commerce Functionality**
  - Browse, purchase, and view Fallout-themed products
  - Products priced in bottle caps for immersion
  - Add items to Favorites (persisted per user)
  - Leave Reviews on products
  - Track Order History in the Profile section

- 💳 **Stripe Integration**
  - Seamless checkout flow using Stripe
  - Test payment supported

- 🧠 **AI Assistant**
  - Powered by OpenRouter API using GPT-4o mini model
  - Fallout-style terminal UI with smart in-universe responses

- 📦 **Admin Dashboard**
  - Add, edit, and delete products
  - Test admin account restricted from modifying real products

- 🌗 **Theming**
  - Supports Fallout 3–style green theme and New Vegas–style amber theme
  - Toggle themes from navbar

- 🖼️ **Supabase Storage**
  - Upload and manage product images securely via storage bucket

- 🛡️ **Form Validation with Zod**
  - Reusable input components and schema-safe validation

---

## 🖼️ Screenshots

### 🏪 Home Page
![Home Page](./public/showcase/home-screen.png)

### 📦 Product Page
![Product Page](./public/showcase/single-product-screen.png)

### ⚙️ Admin Dashboard
![Admin Dashboard](./public/showcase/dashboard-screen.png)

### 🛒 Cart Page
![Cart](./public/showcase/cart-screen.png)


---
    
