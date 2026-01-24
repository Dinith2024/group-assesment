<div align="center">

  <h1>🍔 VisionFood</h1>
  <h2> Group Information</h2>
  <p>
  Student 1 : Dinith Sasanga - ITBIN-2313-0101 - Role-DevOps/Release Manager<br>
  Student 2 : Dhanuka Neranjan - ITBIN-2313-0130 - Role-Backend Developer<br>
  Student 3 : Savindu Wijesinghe - ITBIN-2313-0129 - Role-Frontend Developer<br>
  </p>
  
  <h3>Experience the Future of Food Delivery</h3>
  
  <p>
    A high-performance, aesthetically pleasing food delivery application built with modern web technologies.
    Featuring <b>3D Orbit Animations</b>, real-time data from <b>Sanity CMS</b>, and a seamless ordering experience.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity" alt="Sanity" />
  </p>

  <br />

  <img src="https://github.com/Dinith2024/VisionFood/blob/b891280f8c4a7cb6e5efbc6561ea2e886a1bf0ce/Project%20Banner.png" alt="Project Banner" width="100%" />

</div>

---
## 🌍 Live Deployment

🔗 **Visit the Website:** https://vision-food-drab.vercel.app/

---
## ✨ Features

### 🍽️ Frontend

The frontend of the VisionFood platform delivers a modern, intuitive, and user-friendly food ordering experience. It is fully responsive, ensuring smooth performance across desktops, tablets, and mobile devices. The interface allows users to browse restaurants and menus, view food details with images and prices, add items to the cart, and place orders seamlessly. Interactive forms, real-time feedback, and smooth navigation enhance overall usability and customer satisfaction.

### 🔐 Admin Panel

The VisionFood Admin Panel provides a secure and centralized dashboard for administrators to manage the entire platform efficiently. Admins can monitor and manage customer orders, update food menus and categories, manage restaurants and user accounts, and track order statuses in real time. The dashboard also includes analytical insights such as sales reports and popular items to support informed decision-making.

### ⚙️ DevOps

The DevOps setup for VisionFood ensures scalability, reliability, and smooth development workflows. It includes an automated CI pipeline for continuous integration, testing, and code quality checks. The application supports automatic deployment to platforms such as Vercel, utilizes GitHub branch protection for secure collaboration, and follows a structured, team-based Git workflow aligned with industry best practices.

---
## 🌱 Branch Strategy

We implemented the following branching strategy:

- `main` – Production-ready branch (protected)
- `develop` – Integration branch
- `feature/backend` – Feature development branches
- `feature/frontend` – Feature development branches

---

## 🧑‍💻 Individual Contributions & Commit Evidence

We are actively contributed to the project using professional Git workflows including **feature branches, pull requests, merges, and conflict resolution,** Below is a detailed breakdown of each member’s contributions based on commit history and pull requests.

---
### 👨‍💻 Dinith Sasanga – ITBIN-2313-0101  
**Role:** DevOps Engineer 

**Key Contributions:**
- GitHub repository initialization and configuration
- Branch structure setup (`main`, `develop`, `feature/*`)
- CI/CD pipeline implementation using GitHub Actions
- Vercel deployment configuration and automation
- Admin panel UI development
- Firebase backend integration
- Merge conflict resolution and PR handling
- Project documentation and README maintenance

**Major Commits & Pull Requests:**
- Merge pull request #7 from Dinith2024/Develop
- Merge pull request #6 from Dinith2024/Develop
- Merge pull request #5 from Dinith2024/Develop
- added workflows file
- Update README.md

---

### 👨‍💻 Savindu Wijesinghe – ITBIN-2313-0129
**Role:** Frontend Developer  

**Key Contributions:**
- Design and development of responsive user interfaces using modern frontend technologies
- Implementation of core UI components (home, menu, cart, checkout, profile pages)
- Integration of frontend with backend APIs and Firebase services
- UI/UX enhancements for better usability and accessibility
- Implementation of client-side form validation and error handling
- State management for cart and user sessions
- Optimization of frontend performance and page load speed
- Cross-browser and mobile responsiveness testing

**Major Commits & Pull Requests:**
- Uploaded latest code from laptop
- Added files to my branch
- Added Frontend full code files
- Merge pull request #4 from Dinith2024/2313-0129
- Integrated menu listing and order flow UI
- Improved UI styling, icons, and responsiveness
- Bug fixes and UI refinements based on testing feedback

---
### 👨‍💻 Dhanuka Neranjan – ITBIN-2313-0130
**Role:** Backend Developer

**Key Contributions:**
- Backend architecture design and API development
- Implementation of RESTful APIs for users, orders, and food items
- Firebase backend setup (Authentication, Firestore/Realtime Database)
- Secure user authentication and role-based access control (Admin/User)
- Database schema design and data validation
- Order processing logic and status management
- Integration of backend services with frontend application
- Error handling, logging, and backend performance optimization

**Major Commits & Pull Requests:**
- backend file
- data files
- Implemented Firebase authentication and database operations
- Integrated order management and user management features
- Fixed backend bugs and improved API response handling
- Code refactoring and backend configuration updates

---
## 📂 Project Structure

The project is organized into two main directories: **Frontend** (Next.js) and **Backend** (Sanity Studio).

```bash
vision-food-repo/
├── 📂 frontend/              # Next.js Application
│   ├── 📂 public/            # Static assets (images, icons)
│   ├── 📂 src/
│   │   ├── 📂 app/           # App Router (Pages: Home, Menu, About)
│   │   ├── 📂 components/    # UI Components (Navbar, Cart, Hero)
│   │   ├── 📂 lib/           # Sanity Client & Utils
│   │   └── 📂 styles/        # Global CSS
│   ├── .env.local            # Environment Variables
│   ├── next.config.mjs       # Next.js Config
│   └── tailwind.config.ts    # Tailwind Config
│
├── 📂 backend/               # Sanity Studio (CMS)
│   ├── 📂 schemas/           # Content Schemas (Product, Category)
│   ├── sanity.config.ts      # Sanity Configuration
│   └── sanity.cli.ts         # CLI Config
│
└── README.md                 # Project Documentation
