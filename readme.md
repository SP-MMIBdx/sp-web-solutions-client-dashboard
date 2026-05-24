# SP Web Solutions — Client Dashboard

Full-stack client dashboard application for managing clients, projects, and invoices.

---

## Project Overview

This application is designed for freelance/business workflow management:

- Client management
- Project tracking
- Invoice generation and status tracking
- Role-based access (Admin / Client)

---

## Tech Stack

| Layer    | Stack                          |
| -------- | ------------------------------ |
| Frontend | React, Vite, Tailwind CSS     |
| Backend  | Node.js, Express              |
| Database | PostgreSQL (SQL-based system) |
| Auth     | JWT + bcrypt                  |

---

## Project Structure

sp-web-solutions-client-dashboard/
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
│ ├── models/
│ ├── middleware/
│ ├── config/
│ └── utils/
│
├── database/
│ ├── schema.sql
│ └── migrations/
│
├── .gitignore
└── README.md



---

## Current Status

### Completed
- Project initialized
- Git repository created
- Full-stack folder scaffold created
- Backend Express server running
- `/health` endpoint working
- Development environment stable

### In Progress
- Backend foundation setup (Phase 3 complete)
- Preparing authentication system (Phase 4 next)

---

## Database Design (Planned)

### Clients
- id
- name
- email
- phone
- created_at

### Projects
- id
- client_id (FK)
- name
- description
- status
- start_date
- deadline

### Invoices
- id
- client_id (FK)
- invoice_number
- amount
- due_date
- is_paid

---

## Next Steps

- Build backend authentication (JWT + bcrypt)
- Create users table (Admin / Client roles)
- Secure API routes
- Connect PostgreSQL database
- Start CRUD systems (clients, projects, invoices)

---

## Notes

- Backend runs on `http://localhost:5000`
- Frontend will run on `http://localhost:5173`
- Database: PostgreSQL (to be configured in Phase 4)
- Development is structured in phases with Git commits per milestone