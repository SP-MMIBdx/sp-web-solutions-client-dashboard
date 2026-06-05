# SP Web Solutions — Client Dashboard

Full-stack SaaS-style client dashboard for managing clients, projects, and invoices.

---

## 📌 Project Overview

This application is a lightweight business management system designed for SP Web Solutions.

It provides:

- Client management system
- Project tracking system
- Invoice & payment tracking
- Authentication system (JWT-based)
- Role-based access control (Admin / Employee)
- Scalable REST API architecture

---

## ⚙️ Tech Stack

| Layer | Stack |
|--------|--------|
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
│       └── hooks/
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
```

---

## 🚀 Current Status

### ✅ Phase 0–3 — Infrastructure Complete

- Project initialized
- Git repository created
- Express backend running
- PostgreSQL configured locally
- Prisma ORM installed and connected
- Migration system operational
- Beekeeper Studio connected
- Database schema created and migrated

### Core Models Implemented

- User
- Client
- Project
- Invoice

---

## 🔐 Phase 4 — Authentication System Complete

### Features

- User registration (`POST /auth/register`)
- User login (`POST /auth/login`)
- JWT token generation
- Password hashing with bcrypt
- Auth middleware
- Role-based access control (RBAC)
- Protected routes
- Employee/Admin authorization structure

---

## ⚙️ Phase 5 — Client Management System Complete

### Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /clients | Create client |
| GET | /clients | Get all clients |
| GET | /clients/:id | Get single client |
| PUT | /clients/:id | Update client |
| DELETE | /clients/:id | Delete client |

### Features

- Full CRUD operations
- Validation layer
- Prisma persistence
- Service layer architecture
- Standardized API responses

---

## 📋 Phase 6 — Project Management System Complete

### Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /projects | Create project |
| GET | /projects | Get all projects |
| GET | /projects/:id | Get single project |
| PUT | /projects/:id | Update project |
| DELETE | /projects/:id | Delete project |

### Features

- Full CRUD operations
- Client relationship validation
- Project status workflow
- Project-to-client population
- Partial updates supported

### Supported Status Values

- not_started
- in_progress
- waiting_feedback
- revision
- completed

---

## 💰 Phase 7 — Invoice Management System Complete

### Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /invoices | Create invoice |
| GET | /invoices | Get all invoices |
| GET | /invoices/:id | Get single invoice |
| PUT | /invoices/:id | Update invoice |
| DELETE | /invoices/:id | Delete invoice |

### Features

- Full CRUD operations
- Invoice-to-client relationships
- Paid/unpaid tracking
- Invoice number uniqueness validation
- Due date validation
- Amount validation
- Partial updates supported

---

## 🔐 Security Architecture

### bcrypt

Used for password hashing.

Passwords are never stored in plaintext.

### JWT

Used for authentication and session management.

### Middleware

Protects routes and verifies permissions.

### RBAC

Role-based authorization for SP Web Solutions staff.

---

## 🗄️ Database

### Connection

- Engine: PostgreSQL
- Host: localhost:5432
- ORM: Prisma

### Status

- Fully connected
- Schema synchronized
- Prisma Client operational
- Migration system active

---

## 📊 Database Schema

### User

Stores SP Web Solutions employee accounts.

Fields:

- id
- email
- password (hashed)
- role (admin | employee)
- createdAt

Purpose:

Authentication and authorization.

---

### Client

Stores business clients managed by SP Web Solutions.

Fields:

- id
- name
- email
- phone

Relationships:

- Has many Projects
- Has many Invoices

Purpose:

Client management.

---

### Project

Fields:

- id
- name
- description
- status
- startDate
- deadline
- clientId

Relationships:

- Belongs to Client

Purpose:

Project tracking and workflow management.

---

### Invoice

Fields:

- id
- invoiceNumber (unique)
- amount
- dueDate
- paid
- description
- clientId

Relationships:

- Belongs to Client

Purpose:

Billing and payment tracking.

---

## 🧠 Architecture Overview

### Backend Pattern

Modular MVC + Service Layer architecture.

```text
Routes
↓
Controllers
↓
Services
↓
Prisma
↓
PostgreSQL
```

### Separation of Concerns

| Layer | Responsibility |
|---------|----------------|
| Routes | Endpoint definitions |
| Controllers | HTTP request/response handling |
| Services | Business logic and database operations |
| Middleware | Authentication and authorization |
| Utils | Shared helper functions |
| Prisma | ORM layer |
| PostgreSQL | Persistent storage |

---

## 🔄 Full Backend Request Lifecycle

```text
Client Request
       ↓
Express App (app.js)
       ↓
Route Aggregator
       ↓
Route Module
       ↓
Middleware
       ↓
Controller
       ↓
Service Layer
       ↓
Prisma Client
       ↓
PostgreSQL
       ↓
JSON Response
```

---

## 📦 Standard API Response Format

```json
{
  "message": "string",
  "data": {}
}
```

---

## ⚙️ Error Handling

| Code | Meaning |
|--------|----------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 500 | Server Error |

### Prisma Error Mapping

```text
P2002 → 409 Conflict
P2025 → 404 Not Found
```

---

## 🧪 Current Capabilities

The backend currently supports:

- User registration
- User login
- JWT authentication
- Protected routes
- Role-based access control
- Full Client CRUD
- Full Project CRUD
- Full Invoice CRUD
- Invoice payment tracking
- Client / Project / Invoice relationships
- PostgreSQL persistence
- Prisma ORM integration

---

## 🌐 Local Development

| Service | URL |
|----------|-----|
| Backend | http://localhost:5000 |
| Frontend | http://localhost:5173 |
| Database | localhost:5432 |

---

## 🧭 Development Method

- Phase-based architecture
- Backend-first development
- Schema-first database modeling
- Service-layer architecture
- Incremental Git commits
- Manual API testing using PowerShell Invoke-RestMethod

---

## 🚧 Next Phase — Phase 8

Frontend Dashboard Integration

Planned features:

- Authentication UI
- Dashboard layout
- Client pages
- Project pages
- Invoice pages
- API integration layer
- Protected frontend routes
- Role-aware navigation

---

## 🧾 Project Status

Completed:

- ✅ Phase 0 — Project Setup
- ✅ Phase 1 — Express Foundation
- ✅ Phase 2 — PostgreSQL Setup
- ✅ Phase 3 — Prisma Integration
- ✅ Phase 4 — Authentication System
- ✅ Phase 5 — Client Management System
- ✅ Phase 6 — Project Management System
- ✅ Phase 7 — Invoice Management System

Current Focus:

➡️ Phase 8 — Frontend Dashboard Integration