# Shree A — E-Commerce Clothing Store

A premium **Next.js** e-commerce website for women's traditional Indian clothing — Sarees, Kurtis, Lehengas, and more.

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔥 Firebase Setup (Optional)

Without Firebase, orders are saved to `localStorage` automatically.

To connect Firebase:
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Create a Firestore database
4. Copy your project credentials
5. Create `.env.local` from `.env.example` and fill in credentials

---

## ✨ Features

- 🛍️ **Add to Cart** — Sliding cart sidebar with quantity controls
- ⚡ **Buy Now** — Instant checkout flow
- 📦 **3-Step Checkout** — Address → Payment → Confirmation
- 💵 **Cash on Delivery (COD)** — Recommended payment method
- 💳 **Card & UPI** — Simulated payment options
- 🔥 **Firebase Backend** — Order storage in Firestore
- 💾 **LocalStorage Fallback** — Works without Firebase
- 🎨 **Premium Design** — Traditional Indian aesthetic
- 📱 **Fully Responsive** — Mobile, tablet, desktop
- 🔍 **Search & Filter** — By category and name
