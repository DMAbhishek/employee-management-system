-- ============================================================
-- Employee Management System – MySQL 8 Database Schema
-- File: database/schema.sql
-- Run this once to initialise the database.
-- ============================================================

CREATE DATABASE IF NOT EXISTS emp_management_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE emp_management_db;

-- ============================================================
-- TABLE 1: departments
-- Stores all company departments.
-- Must be created before employees (FK dependency).
-- ============================================================
CREATE TABLE IF NOT EXISTS departments (
    id            BIGINT       AUTO_INCREMENT PRIMARY KEY,
    dept_name     VARCHAR(100) NOT NULL UNIQUE,
    description   VARCHAR(255),
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE 2: users
-- Authentication table. Stores login credentials and roles.
-- Linked 1-to-1 with the employees table (optional for HR/Admin).
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id            BIGINT        AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(100)  NOT NULL UNIQUE,
    email         VARCHAR(150)  NOT NULL UNIQUE,
    password      VARCHAR(255)  NOT NULL,          -- BCrypt hash
    role          ENUM('ADMIN','HR','EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE',
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_email (email),
    INDEX idx_users_role  (role)
);

-- ============================================================
-- TABLE 3: employees
-- Core employee information.
-- Linked to departments and users.
-- ============================================================
CREATE TABLE IF NOT EXISTS employees (
    id                BIGINT        AUTO_INCREMENT PRIMARY KEY,
    employee_code     VARCHAR(20)   NOT NULL UNIQUE,   -- e.g. EMP001
    first_name        VARCHAR(100)  NOT NULL,
    last_name         VARCHAR(100)  NOT NULL,
    email             VARCHAR(150)  NOT NULL UNIQUE,
    phone             VARCHAR(15),
    gender            ENUM('MALE','FEMALE','OTHER'),
    date_of_birth     DATE,
    address           TEXT,
    designation       VARCHAR(100),
    basic_salary      DECIMAL(12,2) DEFAULT 0.00,
    joining_date      DATE          NOT NULL,
    employment_status ENUM('ACTIVE','INACTIVE','ON_LEAVE','TERMINATED') NOT NULL DEFAULT 'ACTIVE',
    department_id     BIGINT,
    user_id           BIGINT UNIQUE,                   -- linked login account
    created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_department FOREIGN KEY (department_id)
        REFERENCES departments(id) ON DELETE SET NULL,
    CONSTRAINT fk_employee_user       FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE SET NULL,

    INDEX idx_emp_code       (employee_code),
    INDEX idx_emp_email      (email),
    INDEX idx_emp_dept       (department_id),
    INDEX idx_emp_status     (employment_status)
);

-- ============================================================
-- TABLE 4: attendance
-- Daily check-in / check-out records per employee.
-- Unique constraint prevents duplicate entries per day.
-- ============================================================
CREATE TABLE IF NOT EXISTS attendance (
    id              BIGINT   AUTO_INCREMENT PRIMARY KEY,
    employee_id     BIGINT   NOT NULL,
    attendance_date DATE     NOT NULL,
    check_in_time   DATETIME,
    check_out_time  DATETIME,
    working_hours   DECIMAL(4,2),                       -- e.g. 8.50
    status          ENUM('PRESENT','ABSENT','HALF_DAY','ON_LEAVE') NOT NULL DEFAULT 'PRESENT',
    remarks         VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_employee FOREIGN KEY (employee_id)
        REFERENCES employees(id) ON DELETE CASCADE,
    -- Prevent duplicate entries for same employee on same date:
    UNIQUE KEY uq_attendance_emp_date (employee_id, attendance_date),

    INDEX idx_att_date    (attendance_date),
    INDEX idx_att_emp     (employee_id),
    INDEX idx_att_status  (status)
);

-- ============================================================
-- TABLE 5: leave_balances
-- Tracks each employee's leave quota and consumed days.
-- One row per employee per leave type per year.
-- ============================================================
CREATE TABLE IF NOT EXISTS leave_balances (
    id              BIGINT  AUTO_INCREMENT PRIMARY KEY,
    employee_id     BIGINT  NOT NULL,
    leave_type      ENUM('CASUAL','SICK','EARNED') NOT NULL,
    year            YEAR    NOT NULL,
    total_days      INT     NOT NULL DEFAULT 0,
    used_days       INT     NOT NULL DEFAULT 0,
    remaining_days  INT     GENERATED ALWAYS AS (total_days - used_days) STORED,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_lbal_employee FOREIGN KEY (employee_id)
        REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE KEY uq_leave_balance (employee_id, leave_type, year)
);

-- ============================================================
-- TABLE 6: leave_requests
-- Employee leave applications with approval workflow.
-- ============================================================
CREATE TABLE IF NOT EXISTS leave_requests (
    id              BIGINT   AUTO_INCREMENT PRIMARY KEY,
    employee_id     BIGINT   NOT NULL,
    leave_type      ENUM('CASUAL','SICK','EARNED') NOT NULL,
    start_date      DATE     NOT NULL,
    end_date        DATE     NOT NULL,
    total_days      INT      NOT NULL,
    reason          TEXT,
    status          ENUM('PENDING','APPROVED','REJECTED','CANCELLED') NOT NULL DEFAULT 'PENDING',
    reviewed_by     BIGINT,                            -- FK to users (HR/Admin who approved)
    review_remarks  VARCHAR(255),
    reviewed_at     TIMESTAMP,
    applied_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_employee FOREIGN KEY (employee_id)
        REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT fk_leave_reviewer FOREIGN KEY (reviewed_by)
        REFERENCES users(id) ON DELETE SET NULL,

    INDEX idx_leave_emp     (employee_id),
    INDEX idx_leave_status  (status),
    INDEX idx_leave_dates   (start_date, end_date)
);

-- ============================================================
-- TABLE 7: salary_records
-- Stores breakdown of salary components per employee.
-- One active record per employee (updated when salary changes).
-- ============================================================
CREATE TABLE IF NOT EXISTS salary_records (
    id              BIGINT         AUTO_INCREMENT PRIMARY KEY,
    employee_id     BIGINT         NOT NULL UNIQUE,
    basic_salary    DECIMAL(12,2)  NOT NULL DEFAULT 0.00,
    hra             DECIMAL(12,2)  NOT NULL DEFAULT 0.00,  -- House Rent Allowance
    da              DECIMAL(12,2)  NOT NULL DEFAULT 0.00,  -- Dearness Allowance
    ta              DECIMAL(12,2)  NOT NULL DEFAULT 0.00,  -- Travel Allowance
    other_allowances DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    pf_deduction    DECIMAL(12,2)  NOT NULL DEFAULT 0.00,  -- Provident Fund
    tax_deduction   DECIMAL(12,2)  NOT NULL DEFAULT 0.00,
    other_deductions DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    gross_salary    DECIMAL(12,2)  GENERATED ALWAYS AS
                        (basic_salary + hra + da + ta + other_allowances) STORED,
    net_salary      DECIMAL(12,2)  GENERATED ALWAYS AS
                        (basic_salary + hra + da + ta + other_allowances
                         - pf_deduction - tax_deduction - other_deductions) STORED,
    effective_from  DATE           NOT NULL,
    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_salary_employee FOREIGN KEY (employee_id)
        REFERENCES employees(id) ON DELETE CASCADE
);

-- ============================================================
-- TABLE 8: payroll_records
-- Monthly payroll generation snapshot.
-- One record per employee per month (enforced by unique key).
-- ============================================================
CREATE TABLE IF NOT EXISTS payroll_records (
    id               BIGINT         AUTO_INCREMENT PRIMARY KEY,
    employee_id      BIGINT         NOT NULL,
    payroll_month    TINYINT        NOT NULL,   -- 1–12
    payroll_year     YEAR           NOT NULL,
    basic_salary     DECIMAL(12,2)  NOT NULL,
    total_allowances DECIMAL(12,2)  NOT NULL,
    total_deductions DECIMAL(12,2)  NOT NULL,
    net_salary       DECIMAL(12,2)  NOT NULL,
    working_days     INT            NOT NULL DEFAULT 0,
    present_days     INT            NOT NULL DEFAULT 0,
    absent_days      INT            NOT NULL DEFAULT 0,
    leave_days       INT            NOT NULL DEFAULT 0,
    payroll_status   ENUM('DRAFT','PROCESSED','PAID') NOT NULL DEFAULT 'DRAFT',
    generated_by     BIGINT,
    generated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payroll_employee FOREIGN KEY (employee_id)
        REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT fk_payroll_generated FOREIGN KEY (generated_by)
        REFERENCES users(id) ON DELETE SET NULL,
    -- Prevent duplicate payroll for same employee+month+year:
    UNIQUE KEY uq_payroll_emp_month (employee_id, payroll_month, payroll_year),

    INDEX idx_payroll_month_year (payroll_month, payroll_year)
);

-- ============================================================
-- TABLE 9: activity_logs
-- Audit trail for important actions in the system.
-- ============================================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id           BIGINT        AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT,
    action       VARCHAR(100)  NOT NULL,         -- e.g. 'EMPLOYEE_ADDED'
    entity_type  VARCHAR(50),                    -- e.g. 'Employee'
    entity_id    BIGINT,
    description  TEXT,
    ip_address   VARCHAR(45),
    created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_log_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE SET NULL,

    INDEX idx_log_user       (user_id),
    INDEX idx_log_entity     (entity_type, entity_id),
    INDEX idx_log_created_at (created_at)
);

-- ============================================================
-- SEED DATA – Default Admin account
-- Password: Admin@123  (BCrypt hash below)
-- Change this immediately after first login!
-- ============================================================
INSERT IGNORE INTO users (username, email, password, role, is_active)
VALUES (
    'admin',
    'admin@empms.com',
    '$2a$12$L8p0CmPfrPWVnLR1nZQZkeFrDv5bNLJP7q3ztCe4KiJGOA1gVRf9u',
    'ADMIN',
    TRUE
);

-- Default departments
INSERT IGNORE INTO departments (dept_name, description) VALUES
    ('Human Resources', 'HR and People Operations'),
    ('Engineering',     'Software Development and IT'),
    ('Finance',         'Accounts and Finance Management'),
    ('Marketing',       'Marketing and Brand Management'),
    ('Operations',      'Business Operations');

