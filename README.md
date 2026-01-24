<div align="center">

  <h1>🍔 VisionFood</h1>
  <h2> Group Information</h2>
  <p>
  Student 1 : Dinith Sasanga - ITBIN-2313-0101 - Role-DevOps/Release Manager
  Student 2 : Dhanuka Neranjan - ITBIN-2313-0130 - Role-Backend Developer
  Student 3 : Savindu Wijesinghe - ITBIN-2313-0129 - Role-Frontend Developer
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

  <img src="https://via.placeholder.com/1200x500.png?text=VisionFood+App+Banner" alt="Project Banner" width="100%" />

</div>

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
