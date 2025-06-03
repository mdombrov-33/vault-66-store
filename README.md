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
![Home Page](./public/images/showcase/home-screen.png)

### 📦 Product Page
![Product Page](./public/images/showcase/single-product-screen.png)

### ⚙️ Admin Dashboard
![Admin Dashboard](./public/images/showcase/dashboard-screen.png)

### 🛒 Cart Page
![Cart](./public/images/showcase/cart-screen.png)


---

## 🧪 Tech Stack

| Tech           | What It's Used For |
|----------------|--------------------|
| **Next.js 15** | Core of the app — routing, server-side logic, and rendering |
| **Tailwind CSS** | Fast and flexible styling using utility classes |
| **ShadCN UI** | Reusable, accessible components |
| **Prisma + PostgreSQL** | Database layer for managing products, cart, reviews, orders |
| **Clerk** | Handles authentication and user roles (regular users, admins) |
| **Stripe** | Checkout and payments — supports test cards out of the box |
| **Supabase** | Stores and serves product images via bucket storage |
| **Zod** | Validates forms and inputs to keep everything type-safe |
| **OpenRouter** | Powers the in-universe AI assistant (uses GPT-4o mini) |

---

## 🛠️ Getting Started

To run this project locally, follow these steps:

### Clone the repository and install dependencies:
```bash
git clone https://github.com/mdombrov-33/vault-66-store.git
cd vault-66-store
npm install
```
### Create a .env file from the example
```bash
cp .env.example .env
```

### Then run the development server:
```bash
npm run dev
```

---

## 🌐 Environment Variables

Make sure to fill in the following environment variables in your `.env` file:

| Variable                                | Purpose                                                    |
|-----------------------------------------|-------------------------------------------------------------|
| `SUPABASE_URL`                          | Supabase project URL for image storage                     |
| `SUPABASE_KEY`                          | Supabase public API key                                    |
| `DATABASE_URL` / `DIRECT_URL`           | PostgreSQL DB URLs (with password inserted)                |
| `DBPASSWORD`                            | Raw Supabase DB password (used in connection strings)      |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`     | Clerk public key for frontend auth                         |
| `CLERK_SECRET_KEY`                      | Clerk secret key for server-side auth                      |
| `ADMIN_USER_ID`                         | Main admin Clerk user ID                                   |
| `TEST_ADMIN_USER_ID`                    | Test admin Clerk user ID (has limited permissions)         |
| `OPENROUTER_API_KEY`                    | API key for GPT-based AI assistant via OpenRouter          |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`    | Stripe key for checkout UI                                 |
| `STRIPE_SECRET_KEY`                     | Stripe secret key for server-side payment handling         |
| `NEXT_PUBLIC_WEBSITE_URL`              | Deployed frontend URL (used in share links, etc.)          |

