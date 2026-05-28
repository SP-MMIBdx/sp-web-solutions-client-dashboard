# SP Web Solutions — Client Dashboard

Full-stack SaaS-style client dashboard for managing clients, projects, and invoices.

---

## 📌 Project Overview

This application is a lightweight business management system for freelancers and agencies.

It provides:

- Client management
- Project tracking system
- Invoice & payment tracking
- Authentication system (JWT-based)
- Role-based access control (Admin / Client)
- Scalable REST API architecture

---

## ⚙️ Tech Stack

| Layer    | Stack                          |
|----------|------------------------------|
| Frontend | React, Vite, Tailwind CSS     |
| Backend  | Node.js, Express              |
| Database | PostgreSQL                    |
| ORM      | Prisma                        |
| Auth     | JWT + bcrypt                  |

---

## 📁 Project Structure


sp-web-solutions-client-dashboard/
│
├── frontend/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── context/
│ └── hooks/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ │ ├── auth.middleware.js
│ │ └── role.middleware.js
│ ├── utils/
│ │ ├── hash.js
│ │ └── jwt.js
│ ├── prisma/
│ │ ├── schema.prisma
│ │ ├── client.js
│ │ └── migrations/
│ ├── app.js
│ └── index.js


---

## 🚀 Current Status

### ✅ Phase 0–3 Completed (Infrastructure)

- Project initialized
- Git repository created
- Express backend running
- PostgreSQL configured locally
- Prisma ORM installed and connected
- Database migration system working
- Beekeeper Studio connected
- Base schema created and migrated
- Core models:
  - User
  - Client
  - Project
  - Invoice

---

### 🔐 Phase 4 — Authentication System (COMPLETE)

#### ✅ Implemented Features

- User registration (`POST /auth/register`)
- User login (`POST /auth/login`)
- JWT token generation
- Password hashing (bcrypt)
- Auth middleware (JWT verification)
- Role-based access control (RBAC)
- Protected routes (`/auth/me`)
- Admin-only route protection
- Client/Admin shared access routes

---

## 🧠 Authentication Flow

### Register Flow

Request → Express → Controller → bcrypt hash → Prisma → PostgreSQL → Response


### Login Flow

Request → Controller → password check → JWT generation → response token


### Protected Request Flow

Client → JWT header → auth middleware → role middleware → controller → response


---

## 🔐 Security Layer

- bcrypt → password hashing (never store plaintext)
- JWT → session authentication
- Middleware → request protection layer
- RBAC → role-based authorization (admin/client separation)

---

## 🗄️ Database

### Connection

- Engine: PostgreSQL
- Host: localhost:5432
- ORM: Prisma

### Status

- Fully connected
- Migration system active
- Schema synced
- Prisma Client operational

---

## 📊 Active Database Schema

### User

- id
- email (unique)
- password (hashed)
- role (admin | client)
- createdAt

Purpose:
Authentication + authorization system

---

### Client

- id
- name
- email
- phone
- userId (optional FK)

Purpose:
Business/client entity linked to system users

---

### Project

- id
- name
- description
- status (not_started | in_progress | waiting_feedback | revision | completed)
- startDate
- deadline
- clientId

Purpose:
Project tracking system

---

### Invoice

- id
- invoiceNumber (unique)
- amount
- dueDate
- paid
- description
- clientId

Purpose:
Billing and payment tracking

---

## 🧠 Architecture Overview

### Backend Design Pattern

- Modular MVC architecture
- Separation of concerns:
  - routes → endpoints
  - controllers → logic
  - middleware → security layer
  - utils → helpers
  - prisma → database layer

---

## 🔄 Full Backend Request Lifecycle


Client Request
↓
Express App (app.js)
↓
Route Aggregator (routes/index.js)
↓
Route Module (auth.routes.js)
↓
Middleware Layer
├── auth.middleware.js (JWT verification)
├── role.middleware.js (RBAC)
↓
Controller (business logic)
↓
Utils (bcrypt / jwt)
↓
Prisma Client
↓
PostgreSQL
↓
Response (JSON)


---

## ⚙️ Development Method

- Phase-based development (0 → 9)
- Backend-first architecture
- Schema-first database design
- Git commits per milestone
- Incremental feature rollout

---

## 🌐 Local Development

| Service  | URL |
|----------|-----|
| Backend  | http://localhost:5000 |
| Frontend | http://localhost:5173 |
| Database | localhost:5432 |

---

## 🧪 Current Capabilities

The backend currently supports:

- User registration
- User login
- JWT authentication
- Protected routes
- Role-based access control
- Secure password storage
- PostgreSQL persistence

---

## 🚧 Next Phase (Phase 5)

Client Management System:

- Create clients API
- Read clients API
- Update clients API
- Delete clients API
- Link clients to projects
- Link clients to invoices

---