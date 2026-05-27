# SP Web Solutions — Client Dashboard

Full-stack client dashboard application for managing clients, projects, and invoices.

---

## 📌 Project Overview

This application is designed as a lightweight SaaS-style business tool for freelancers and agencies:

- Client management
- Project tracking
- Invoice generation & payment tracking
- Role-based access (Admin / Client)
- Scalable backend architecture (REST API + PostgreSQL)

---

## ⚙️ Tech Stack

| Layer    | Stack                          |
|----------|------------------------------|
| Frontend | React, Vite, Tailwind CSS     |
| Backend  | Node.js, Express              |
| Database | PostgreSQL (via Prisma ORM)   |
| ORM      | Prisma                        |
| Auth     | JWT + bcrypt                  |

---

## 📁 Project Structure


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
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
│
├── .gitignore
└── README.md


---

## 🚀 Current Status

### ✅ Completed (Phase 0–3)

- Project initialized
- Git repository created
- Full-stack folder scaffold created
- Node.js environment configured
- Express backend running
- `/health` endpoint working
- PostgreSQL installed and configured locally
- Database created: `spwebsolutionsdashboard`
- Prisma ORM installed and initialized
- Prisma connected successfully
- Migration system verified
- Beekeeper Studio connected
- Schema implemented and migrated successfully
- Ready for authentication development

- Initial relational schema created:
  - User
  - Client
  - Project
  - Invoice

- Schema architecture refined:
  - User → optional Client profile
  - Client → Projects
  - Client → Invoices

- Additional business fields added:
  - Client.phone
  - Invoice.invoiceNumber

- Database migration successfully executed
- Relationships verified visually in Beekeeper Studio

### ⚙️ Next Phase

Phase 4 — Authentication System
- Register
- Login
- Password hashing
- JWT generation
- Protected routes
- Admin / Client permissions

---

## 🗄️ Database

### Connection
- Engine: PostgreSQL (local)
- Host: `localhost:5432`
- Database: `spwebsolutionsdashboard`
- ORM: Prisma

### Status
- Fully connected via Prisma
- Migration successfully executed
- Database schema is active and deployed
- Visible in Beekeeper Studio

---

## 📊 Active Database Schema

### User
- id
- email (unique)
- password
- role (admin | client)
- createdAt

Relationships:
- Optional one-to-one Client profile

Purpose:
- Authentication and authorization
- Admin and client login accounts

---

### Client
- id
- name
- email
- phone
- userId (optional FK → User)

Relationships:
- Optional link to User account
- Has many Projects
- Has many Invoices

Purpose:
- Stores business/client information
- Can exist with or without portal access

---

### Project
- id
- name
- description
- status
  - not_started
  - in_progress
  - waiting_feedback
  - revision
  - completed
- startDate
- deadline
- clientId (FK → Client)

Relationships:
- Belongs to Client

Purpose:
- Tracks project progress and status

---

### Invoice
- id
- invoiceNumber (unique)
- amount
- dueDate
- paid (boolean)
- description
- clientId (FK → Client)

Relationships:
- Belongs to Client

Purpose:
- Tracks billing and payment status

---

## 🧠 Architecture Notes

- Backend: REST API (Express)
- Prisma: ORM layer between Node and PostgreSQL
- Beekeeper Studio: database visualization tool
- Development follows phased architecture (0 → 9)
- Git commits per milestone

---

## 🌐 Local Development

| Service  | URL |
|----------|-----|
| Backend  | http://localhost:5000 |
| Frontend | http://localhost:5173 |
| DB       | localhost:5432 |

---

## 🧭 Development Method

- Phase-based development
- Backend-first architecture
- Schema-first database design
- Incremental Git commits

---

## 🧪 Notes

- Backend stable
- Database connection verified
- Prisma migration system working
- Ready for schema design