# 🛒 Apna Bazaar

> A modern, full-stack e-commerce platform built with React and Node.js — your one-stop online shopping destination.

![Apna Bazaar Banner](<img width="831" height="921" alt="Screenshot 2026-04-25 214555" src="https://github.com/user-attachments/assets/361e215c-f066-4d0e-aee9-370f9ad279ec" />
)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://your-live-demo-link.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 📖 About the Project

**Apna Bazaar** is a fully functional e-commerce web application that allows users to browse products, manage their shopping cart, and complete purchases — all in one seamless experience. The platform includes a powerful admin dashboard to manage products, orders, and users with ease.

Whether you're a shopper looking for great deals or an admin managing an online store, Apna Bazaar has you covered.

---

## 🌐 Live Demo

🔗 **[Visit Apna Bazaar →](https://apnabazzarr.netlify.app/)**

> Replace the above URL with your actual deployed link (Vercel, Netlify, Render, etc.)

---

## 📸 Screenshots

> Add your actual screenshots in a `/screenshots` folder and update the paths below.

| Home Page | Product Page |
|-----------|--------------|
| ![Home](<img width="831" height="921" alt="Screenshot 2026-04-25 214555" src="https://github.com/user-attachments/assets/ddc02500-d992-42af-baff-002f9b33375e" />
) 

| Shopping Cart | Admin Dashboard |
|---------------|-----------------|
| ![Cart](<img width="1484" height="655" alt="Screenshot 2026-04-25 214655" src="https://github.com/user-attachments/assets/6e2443f9-ff3c-44a3-bdfc-8a1725dfe0a6" />
) | (<img width="1605" height="424" alt="Screenshot 2026-04-25 214628" src="https://github.com/user-attachments/assets/4a484ca3-5c1f-4695-aad6-5adf49e4dbfc" />
) |

---

## ✨ Features

### 👤 User
- 🔐 **User Authentication** — Secure Sign Up, Login & Logout
- 🛍️ **Shopping Cart** — Add, remove, and update product quantities
- 💳 **Checkout Flow** — Smooth and intuitive checkout process
- 📦 **Order Summary** — Review orders before placing

### 🛠️ Admin
- 📊 **Admin Dashboard** — Full control panel for store management
- 📁 **Product Management** — Add, edit, and delete products
- 👥 **User Management** — View and manage registered users
- 📋 **Order Management** — Track and update order statuses

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js / Next.js |
| **Backend** | Node.js, Express.js |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | CSS / Tailwind CSS |
| **API** | RESTful API |

---

## 🚀 Getting Started

Follow these steps to run **Apna Bazaar** locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/apna-bazaar.git
cd apna-bazaar
```

**2. Install Backend Dependencies**

```bash
cd backend
npm install
```

**3. Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

**4. Set up Environment Variables**

Create a `.env` file in both the `backend` and `frontend` folders. See the [Environment Variables](#environment-variables) section below.

**5. Run the Application**

Open two terminals:

```bash
# Terminal 1 — Start Backend
cd backend
npm run dev
```

```bash
# Terminal 2 — Start Frontend
cd frontend
npm start
```

The app will be running at **http://localhost:3000**

---

## 📁 Folder Structure

```
apna-bazaar/
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── context/        # Global state management
│   │   ├── utils/          # Helper functions
│   │   └── App.js
│   └── package.json
│
├── backend/                # Node.js + Express backend
│   ├── controllers/        # Route handler logic
│   ├── models/             # Database models/schemas
│   ├── routes/             # API route definitions
│   ├── middleware/         # Auth & error middleware
│   ├── config/             # DB & app configuration
│   └── server.js
│
├── screenshots/            # App screenshots
├── .gitignore
└── README.md
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit your `.env` files. They are already listed in `.gitignore`.

---

## 📜 Available Scripts

### Backend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start server with nodemon (development) |
| `npm start` | Start server (production) |

### Frontend

| Script | Description |
|--------|-------------|
| `npm start` | Start React development server |
| `npm run build` | Build for production |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)

---

<p align="center">Made with ❤️ for Apna Bazaar</p>
