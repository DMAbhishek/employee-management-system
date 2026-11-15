# 🏢 Employee Management System

> A complete, professional **Java Full Stack** application built with **React.js**, **Spring Boot 3**, and **MySQL 8**.
> Suitable as a B.Tech CSE final-year project and Java Full Stack Developer portfolio.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

The **Employee Management System (EmpMS)** is a full-featured HR management platform that handles:
- Employee records (CRUD)
- Department management
- Attendance tracking (check-in / check-out)
- Leave management with approval workflow
- Payroll generation and payslips
- Role-based dashboards and reports

---

## Features

| Module | Description |
|---|---|
| 🔐 Authentication | JWT login, BCrypt passwords, role-based access |
| 👥 Employee Management | Add, view, edit, delete, search, filter, paginate |
| 🏬 Department Management | Full CRUD with employee count |
| 📅 Attendance | Check-in/out, working-hours, date-wise reports |
| 🌴 Leave Management | Apply, approve/reject, balance tracking |
| 💰 Payroll | Monthly generation, net salary, printable payslips |
| 📊 Reports & Analytics | Charts, filters, printable reports |
| ⚙️ User Management | Admin creates/manages HR and Employee accounts |

---

## Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Bootstrap 5 | Responsive layout & components |
| React Icons | Icon library |
| Chart.js / react-chartjs-2 | Dashboard charts |
| React Toastify | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Java 17 | Programming language |
| Spring Boot 3.3 | Application framework |
| Spring Security | Authentication & authorisation |
| Spring Data JPA / Hibernate | ORM |
| JJWT 0.12 | JWT token generation/validation |
| Lombok | Boilerplate reduction |
| Maven | Build tool |
| Jakarta Validation | Input validation |

### Database
| Technology | Purpose |
|---|---|
| MySQL 8 | Relational database |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (React)                 │
│  Pages → Components → Services (Axios) → REST API  │
└─────────────────────┬───────────────────────────────┘
                      │  HTTP/JSON (port 3000 → 8080)
┌─────────────────────▼───────────────────────────────┐
│                 BACKEND (Spring Boot)               │
│  SecurityFilter → Controller → Service → Repository│
│               ↕ JWT  ↕ DTO  ↕ Entity               │
└─────────────────────┬───────────────────────────────┘
                      │  JDBC (Hibernate)
┌─────────────────────▼───────────────────────────────┐
│                   DATABASE (MySQL 8)                │
│  emp_management_db  (9 tables)                      │
└─────────────────────────────────────────────────────┘
```

---

## Database Design

| Table | Description |
|---|---|
| `users` | Login credentials and roles (ADMIN, HR, EMPLOYEE) |
| `employees` | Core employee information |
| `departments` | Company departments |
| `attendance` | Daily check-in/out records |
| `leave_balances` | Leave quota per employee per year |
| `leave_requests` | Leave applications with approval status |
| `salary_records` | Salary component breakdown per employee |
| `payroll_records` | Monthly payroll snapshots |
| `activity_logs` | Audit trail |

---

## Prerequisites

Ensure the following are installed before setup:

| Software | Version | Check Command |
|---|---|---|
| Java JDK | 17+ | `java -version` |
| Apache Maven | 3.6+ | `mvn -version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| MySQL | 8.0 | `mysql --version` |
| Git | Any | `git --version` |

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/employee-management-system.git
cd employee-management-system
```

### 2. Set Up the Database
Open MySQL Workbench or MySQL CLI and run:
```sql
source database/schema.sql;
```

### 3. Configure the Backend
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/emp_management_db?...
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
jwt.secret=YourSecretKeyMinimum32Characters!
```

### 4. Build and Run the Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend starts at: http://localhost:8080

### 5. Install and Run the Frontend
```bash
cd frontend
npm install
npm start
```
Frontend starts at: http://localhost:3000

---

## Environment Configuration

Copy `.env.example` to `.env` and fill in your values:
```
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your_32_char_secret
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

> ⚠️ **Never commit** `.env` or `application.properties` with real credentials to GitHub.

---

## Running the Application

| Step | Command | URL |
|---|---|---|
| Start MySQL | (MySQL service) | localhost:3306 |
| Start Backend | `mvn spring-boot:run` (in /backend) | http://localhost:8080 |
| Start Frontend | `npm start` (in /frontend) | http://localhost:3000 |

### Default Admin Login
| Field | Value |
|---|---|
| Username | `admin` |
| Password | `Admin@123` |

> Change the admin password immediately after first login.

---

## API Documentation

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login and receive JWT |
| POST | `/api/auth/logout` | Invalidate token |

### Employees
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | List all (paginated) |
| GET | `/api/employees/{id}` | Get one employee |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

### Departments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/departments` | List all |
| POST | `/api/departments` | Create |
| PUT | `/api/departments/{id}` | Update |
| DELETE | `/api/departments/{id}` | Delete |

### Attendance
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/attendance/check-in` | Mark check-in |
| POST | `/api/attendance/check-out` | Mark check-out |
| GET | `/api/attendance` | All records |
| GET | `/api/attendance/employee/{id}` | Employee records |

### Leaves
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/leaves` | Apply for leave |
| GET | `/api/leaves` | All requests |
| PUT | `/api/leaves/{id}/approve` | Approve |
| PUT | `/api/leaves/{id}/reject` | Reject |

### Payroll
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payroll/generate` | Generate monthly payroll |
| GET | `/api/payroll` | All records |
| GET | `/api/payroll/employee/{id}` | Employee payroll |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/statistics` | Aggregated stats |

---

## User Roles

| Role | Access |
|---|---|
| **ADMIN** | Full access – all modules including user management |
| **HR** | Employee, department, attendance, leave, payroll, reports |
| **EMPLOYEE** | Own profile, attendance, leave, payslips |

---

## Future Enhancements

- 📧 Email notifications for leave approvals
- 📱 Progressive Web App (PWA)
- 📤 Excel/PDF export for reports
- 🌐 Multi-language support (i18n)
- 🏖️ Holiday calendar integration
- 📈 Advanced HR analytics
- 🔔 Real-time notifications (WebSocket)
- ☁️ Cloud deployment (AWS / GCP)

---

## License

This project is created for educational purposes (B.Tech CSE Final Year Project).

---

*Built with ❤️ using Java Spring Boot + React.js*

