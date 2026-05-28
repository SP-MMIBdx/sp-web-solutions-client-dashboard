# SP Web Solutions — Client Dashboard

Full-stack SaaS-style client dashboard for managing clients, projects, and invoices.

---

## 📌 Project Overview

This application is a lightweight business management system for freelancers and agencies.

It provides:

- Client management system
- Project tracking system
- Invoice & payment tracking
- Authentication system (JWT-based)
- Role-based access control (Admin / Client)
- Scalable REST API architecture

---

## ⚙️ Tech Stack

| Layer    | Stack                        |
|----------|-----------------------------|
| Frontend | React, Vite, Tailwind CSS   |
| Backend  | Node.js, Express            |
| Database | PostgreSQL                 |
| ORM      | Prisma                     |
| Auth     | JWT + bcrypt               |

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
│ │ ├── auth.routes.js
│ │ ├── client.routes.js
│ │ └── index.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── client.controller.js
│ ├── services/
│ │ └── client.service.js
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

### ✅ Phase 0–3 — Infrastructure COMPLETE

- Project initialized
- Git repository created
- Express backend running
- PostgreSQL configured locally
- Prisma ORM installed and connected
- Migration system working
- Beekeeper Studio connected
- Database schema created and migrated

### Core Models Implemented

- User
- Client
- Project
- Invoice

---

## 🔐 Phase 4 — Authentication System (COMPLETE)

### ✅ Implemented Features

- User registration (`POST /auth/register`)
- User login (`POST /auth/login`)
- JWT token generation
- Password hashing (bcrypt)
- Auth middleware (JWT verification)
- Role-based access control (RBAC)
- Protected route (`/auth/me`)
- Admin-only access routes
- Client/Admin shared access routes

---

## 🧠 Authentication Flow

### Register Flow

Request → Controller → bcrypt → Prisma → PostgreSQL → Response


### Login Flow

Request → Controller → Password validation → JWT generation → Response


### Protected Route Flow

Client → JWT → Auth Middleware → Role Middleware → Controller → Response


---

## 🔐 Security Architecture

- **bcrypt** → password hashing (never store plaintext)
- **JWT** → stateless authentication
- **Middleware layer** → request protection
- **RBAC** → role-based authorization (admin/client)

---

## 🗄️ Database

### Connection

- Engine: PostgreSQL
- Host: localhost:5432
- ORM: Prisma

### Status

- Fully connected
- Migration system active
- Schema synchronized
- Prisma Client operational

---

## 📊 Database Schema

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
- phone (optional)
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

### Backend Pattern

- Modular MVC architecture
- Service layer introduced (Phase 5)
- Separation of concerns:


routes → controllers → services → utils → prisma → database


---

## 🔄 Full Backend Request Lifecycle


Client Request
↓
Express App (app.js)
↓
Route Aggregator (routes/index.js)
↓
Route Module
↓
Middleware Layer
├── auth.middleware.js (JWT verification)
├── role.middleware.js (RBAC)
↓
Controller (business logic)
↓
Service Layer (database logic)
↓
Utils (bcrypt / jwt)
↓
Prisma Client
↓
PostgreSQL
↓
Response (JSON)


---

## ⚙️ Phase 5 — Client Management System (COMPLETE)

### ✅ Implemented Features

Full CRUD system for clients:

| Method | Endpoint         | Description       |
|--------|-----------------|-------------------|
| POST   | /clients         | Create client     |
| GET    | /clients         | Get all clients   |
| GET    | /clients/:id     | Get single client |
| PUT    | /clients/:id     | Update client     |
| DELETE | /clients/:id     | Delete client     |

---

### 🧠 Architecture Added

- Service layer (`client.service.js`)
- Controller layer (`client.controller.js`)
- Prisma-based data persistence
- Consistent API response format:

```json
// {
  "message": "string",
  "data": {}
// } 
⚙️ Error Handling
404 → resource not found (Prisma P2025)
400 → invalid input
500 → server error
📦 Client Flow
Request → Controller → Service → Prisma → PostgreSQL → Response
🧪 Current Capabilities

The backend now supports:

User registration
User login
JWT authentication
Protected routes
Role-based access control
Full client CRUD system
Secure password storage
PostgreSQL persistence
🌐 Local Development
Service	URL
Backend	http://localhost:5000
Frontend	http://localhost:5173
Database	localhost:5432
🧭 Development Method
Phase-based architecture (0 → 9)
Backend-first design
Schema-first database modeling
Service-layer separation introduced
Incremental Git commits per feature
Manual API testing (PowerShell / curl)
🚧 Next Phase (Phase 6)

Project Management System:

Project CRUD API
Link projects to clients
Status tracking system
Deadline logic
Progress workflow updates

---

## 🧾 DONE FOR TODAY

You now have:

- Clean README (production-level structure)
- Accurate Phase 4 + Phase 5 documentation
- Real architecture reflected (service layer included)
- No duplication or outdated flows
- Ready for Phase 6 (Projects system)

---


👉 Phase 6 = Project system design 

---