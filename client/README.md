# ChamaConnect – Frontend (Client)

ChamaConnect is a modern, responsive MERN application frontend designed to help Chamas (group savings associations) operate transparently and efficiently.  
This repository section covers **only the client (frontend)** implementation.

---

## ✨ Features Overview

### 🎨 UI & Design
- Modern, **calm but vibrant** interface
- **Light & Dark theme toggle** (system-aware)
- Soft **gradient glow backgrounds** (warm + cool accents)
- Bold gradient CTAs for primary actions
- Accessible **focus rings** and smooth micro-interactions
- Consistent design tokens via CSS variables

### 📱 Responsive Layout
- **Desktop**: Sidebar navigation
- **Mobile**: Bottom navigation
- Fully responsive landing page and app screens

### 🧩 Reusable UI System
- Centralised UI components for consistency:
  - `<Button />`
  - `<Input />`
  - `<Textarea />`
  - `<Card />`
- Built-in hover lift, focus states, and theme awareness

---

## 🏗️ Tech Stack (Frontend)

- **React** (Vite)
- **React Router**
- **Tailwind CSS**
- **CSS Variables** for theme management
- **Lucide Icons**
- **Axios** (API-ready)

---

## 📁 Folder Structure (Client)

```txt
client/
├─ src/
│  ├─ components/
│  │  ├─ ui/
│  │  │  ├─ Button.jsx
│  │  │  ├─ Input.jsx
│  │  │  ├─ Textarea.jsx
│  │  │  └─ Card.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ BottomNav.jsx
│  │  └─ ThemeToggle.jsx
│  │
│  ├─ layouts/
│  │  ├─ PublicLayout.jsx
│  │  └─ AppLayout.jsx
│  │
│  ├─ pages/
│  │  ├─ public/
│  │  │  └─ Landing.jsx
│  │  ├─ auth/
│  │  │  ├─ Login.jsx
│  │  │  └─ Register.jsx
│  │  └─ app/
│  │     ├─ Dashboard.jsx
│  │     ├─ Chamas.jsx
│  │     ├─ CreateChama.jsx
│  │     ├─ JoinChama.jsx
│  │     ├─ ChamaDetails.jsx
│  │     └─ Settings.jsx
│  │
│  ├─ lib/
│  │  ├─ api.js
│  │  ├─ auth.js
│  │  └─ theme.js
│  │
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
│
├─ tailwind.config.js
├─ index.html
└─ package.json


