# 🛡️ QbitShield – Quantum-Safe Key Infrastructure

> Quantum-Ready Cryptography as a Service  
> Built with Next.js 15 + Supabase SSR + TailwindCSS + Vercel

---

## 🔐 Overview

QbitShield is a cryptographic API platform that provides **quantum-safe key distribution** via real QKD protocol validation (IonQ Aria-1). Designed for developers who need next-gen secure key generation backed by verified randomness and modern security.

- ⚡ Supabase SSR authentication & session management  
- 🌐 Next.js App Router (v15)  
- 🎨 TailwindCSS 4 styling  
- 🔐 OAuth + Password Auth  
- 📡 Hosted on Vercel

---

## 🚀 Getting Started

### 1. Clone the project

```bash

git clone https://github.com/Sensorman/qbitshield-landing.git
cd qbitshield-landing
```

### 2. Setup environment variables

Create a .env.local file in the root and add:

```bash

NEXT_PUBLIC_SITE_URL=https://qbitshield.com
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
SUPABASE_GITHUB_CLIENT_ID=xxx
SUPABASE_GITHUB_CLIENT_SECRET=xxx
RESEND_API_KEY=optional
```
### 3. Install Dependencies
```bash
yarn install
```

### 4. Run Locally

```bash
yarn dev
```
Open http://localhost:3000 in your browser.


### Project Structure
```text
.
├── app/
│   ├── api/                → API Routes (SSR w/ Supabase)
│   ├── dashboard/          → Protected page
│   ├── auth/, login/, signup/, reset-password/
│   └── layout.js, page.tsx  → Root layout + home
├── components/             → Reusable UI components
├── utils/supabase/         → SSR/CSR/Middleware clients
├── public/                 → Static assets (logo, SVGs)
├── .env.local              → 🔐 Env variables
├── tailwind.config.js      → Tailwind setup
├── README.md               → You are here
```

### 🧠 Tech Stack
	•	Next.js 15
	•	Supabase SSR
	•	TailwindCSS 4
	•	Vercel Hosting
	•	Resend (Transactional Email)

### Scripts
```bash
yarn dev       # Run dev server
yarn build     # Production build
yarn start     # Start prod server
yarn lint      # ESLint checks
```
### 🔐 Security Features
	•	✅ Supabase SSR auth (cookies)
	•	✅ Row Level Security (RLS)
	•	✅ GitHub / Google OAuth
	•	✅ Email + Password login
	•	✅ Encrypted JWT sessions

### Deployment

Auto-deploys to Vercel from main.

Manual deploy:
```bash
vercel --prod
```

### 👨‍💻 Author

Built by @Sensorman
🚀 Founder @ QbitShield LLC · All Rights Reserved 2025

⸻

📜 License

MIT

---

### ✅ To use:

1. Open `README.md` in PyCharm  
2. **Select all**, paste the block above  
3. Save  
4. Commit it:

```bash
git add README.md
git commit -m "docs: update project readme with full overview"
git push

