# SP Web Solutions — Client Dashboard

Full-stack SaaS-style client dashboard for managing clients, projects, and invoices.

---

## 📌 Project Overview

SP Web Solutions Client Dashboard is a lightweight internal business management system designed to centralize client operations, project tracking, and invoice management.

It is built as a **full-stack React + Node.js application** with a scalable REST API architecture.

### Core Features

- Client management system (CRUD)
- Project tracking system (status workflow)
- Invoice & payment tracking system
- Authentication system (JWT-based)
- Role-based access control (Admin / Employee)
- Fully modular API architecture
- Frontend dashboard (React SPA)

---

## ⚙️ Tech Stack

| Layer | Stack |
|------|------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + bcrypt |

---

## 📁 Project Structure

```text
sp-web-solutions-client-dashboard/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── context/
│       └── routes/
│
├── backend/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── client.routes.js
│   │   ├── project.routes.js
│   │   ├── invoice.routes.js
│   │   └── index.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── client.controller.js
│   │   ├── project.controller.js
│   │   └── invoice.controller.js
│   │
│   ├── services/
│   │   ├── client.service.js
│   │   ├── project.service.js
│   │   └── invoice.service.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── utils/
│   │   ├── hash.js
│   │   └── jwt.js
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── client.js
│   │   └── migrations/
│   │
│   ├── app.js
│   └── index.js
│
└── README.md
````

---

## 🚀 Current Status

### ✅ Phase 0–3 — Infrastructure Complete

* Project initialized
* Git repository created
* Express backend running
* PostgreSQL configured locally
* Prisma ORM installed and connected
* Migration system operational
* Database schema created and synchronized
* Core API foundation established

---

## 🔐 Phase 4 — Authentication System (COMPLETE)

### Features

* User registration (`POST /auth/register`)
* User login (`POST /auth/login`)
* JWT authentication
* Password hashing (bcrypt)
* Auth middleware (JWT verification)
* Role-based access control (RBAC)
* Protected route (`/auth/me`)

### Roles

* `admin`
* `employee`

---

## ⚙️ Phase 5 — Client Management System (COMPLETE)

### Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | /clients     | Create client   |
| GET    | /clients     | Get all clients |
| GET    | /clients/:id | Get client      |
| PUT    | /clients/:id | Update client   |
| DELETE | /clients/:id | Delete client   |

### Features

* Full CRUD operations
* Prisma persistence
* Service-layer architecture
* Input validation
* Standardized API responses

---

## 📋 Phase 6 — Project Management System (COMPLETE)

### Endpoints

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /projects     |
| GET    | /projects     |
| GET    | /projects/:id |
| PUT    | /projects/:id |
| DELETE | /projects/:id |

### Features

* Client relationship validation
* Project status workflow system
* Partial updates supported
* Foreign key relational integrity
* Client → Project (1:N)

### Project Status Values

* `not_started`
* `in_progress`
* `waiting_feedback`
* `revision`
* `completed`

---

## 💰 Phase 7 — Invoice Management System (COMPLETE)

### Endpoints

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /invoices     |
| GET    | /invoices     |
| GET    | /invoices/:id |
| PUT    | /invoices/:id |
| DELETE | /invoices/:id |

### Features

* Invoice CRUD system
* Invoice-to-client relationship
* Unique invoice numbers
* Payment tracking (`paid: boolean`)
* Due date validation
* Amount validation (> 0)
* Partial updates supported

---

## 🧠 Phase 8 — Frontend Dashboard (COMPLETE)

### Frontend Stack

* React (Vite)
* Tailwind CSS
* React Router
* Axios (centralized API layer)
* Context API (Auth system)

---

### Frontend Architecture

```text
React App
  ↓
AuthContext
  ↓
Router (Protected Routes)
  ↓
DashboardLayout
  ├── Sidebar
  ├── Navbar
  └── Pages
```

---

### Pages Implemented

#### Authentication

* Login page (JWT login + persistence)

#### Dashboard

* Client / Project / Invoice overview metrics

#### Clients

* Full CRUD UI
* Inline delete + edit support

#### Projects

* Status-based workflow UI
* Client relationship selection

#### Invoices

* Full CRUD UI
* Payment toggle system
* EUR currency formatting (€)

---

### UI System

* Sidebar navigation
* Responsive dashboard layout
* Clean minimal design
* No aggressive animations (intentional design choice)
* Tailwind-based styling system

---

## 💶 Currency System

All invoice amounts are displayed in **EUR (€)**:

```js
new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
})
```

---

## 🗑️ Delete System Behaviour

### Important Constraint Logic

Database uses **RESTRICT foreign keys**:

* Client → Projects (1:N)
* Client → Invoices (1:N)

### Deletion order requirement:

1. Delete invoices
2. Delete projects
3. Delete client

This is expected relational database behavior (not a bug).

---

## 🔐 Authentication Architecture

* JWT stored in `localStorage`
* `/auth/me` used for session hydration
* Role-based UI readiness implemented
* Backend enforces RBAC independently

---

## 🗄️ Database

### Engine

* PostgreSQL

### ORM

* Prisma

### Status

* Fully migrated
* Fully synchronized
* Schema stable

---

## 📊 Core Models

### User

* id
* email
* password
* role
* createdAt

### Client

* id
* name
* email
* phone

### Project

* id
* name
* description
* status
* clientId

### Invoice

* id
* invoiceNumber (unique)
* amount
* dueDate
* paid
* clientId

---

## 🧪 Testing Methodology

* Manual API testing via PowerShell (`Invoke-RestMethod`)
* Full CRUD verification across all entities
* Frontend + backend integration testing
* Foreign key constraint validation
* Auth flow testing (login + session restore)

---

## 🌐 Local Development

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Backend  | [http://localhost:5000](http://localhost:5000) |
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Database | localhost:5432                                 |

---

## 🧭 Development Method

* Phase-based architecture
* Backend-first development
* Schema-first database design
* Service-layer separation
* Incremental Git commits
* Manual API validation
* Frontend integration after API stability

---

## 🚧 Next Phase — Phase 9 (Productization)

Planned improvements:

* Dashboard analytics (KPIs)
* Search + filtering system
* Overdue invoice detection
* Project deadline alerts
* UI/UX polish
* Performance optimization
* Production deployment (Vercel + backend hosting)
* Environment separation (dev/prod)

---

## 🧾 Project Status

### Completed

* ✅ Phase 0 — Setup
* ✅ Phase 1 — Express Foundation
* ✅ Phase 2 — PostgreSQL Setup
* ✅ Phase 3 — Prisma Integration
* ✅ Phase 4 — Authentication System
* ✅ Phase 5 — Client Management
* ✅ Phase 6 — Project Management
* ✅ Phase 7 — Invoice System
* ✅ Phase 8 — Frontend Dashboard

---

## 🏁 Final State

The system is now a **fully functional full-stack SaaS-style dashboard** with:

* Secure authentication
* Role-based access structure
* Complete CRUD backend
* Fully integrated frontend SPA
* Relational database integrity
* Production-ready architecture foundation

```