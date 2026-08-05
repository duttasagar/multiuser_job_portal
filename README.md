# 💼 Multi-User Job Portal

A full-stack **Multi-User Job Portal** built with **React.js** and **Django REST Framework**, with **MySQL** as the database.

The platform connects **Job Seekers** and **Recruiters** through a role-based system. Job seekers can create profiles, upload resumes, browse available jobs, and submit applications, while recruiters can manage companies, publish job openings, review applicants, and update application statuses.

## 🚀 Live Demo

🌐 **Live Application:**
https://multiuser-job-portal.vercel.app

📂 **GitHub Repository:**
https://github.com/duttasagar/multiuser_job_portal

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration
* Email OTP verification
* User login and logout
* JWT-based authentication
* Forgot password functionality
* Password reset using OTP
* Role-based access control
* Current user profile/authentication endpoint

### 👨‍💼 Job Seeker

* Create and manage personal profile
* Profile completion tracking
* Upload resume
* Browse available jobs
* View detailed job information
* Apply for jobs
* View submitted applications
* Track application status
* Receive notifications
* Mark notifications as read

### 🏢 Recruiter

* Recruiter dashboard
* Create and manage company information
* Create job postings
* Update job postings
* Delete job postings
* View posted jobs
* View job applications
* Review candidates
* Update application status
* Manage recruiter profile

### 💼 Job Management

* Public job listing
* Public job details
* Recruiter-specific job management
* Job creation and editing
* Job deletion
* Job application workflow

### 📄 Application Management

* Apply to jobs
* View personal applications
* Recruiter application management
* Application status updates
* Candidate/application tracking

### 🔔 Notifications

* User notifications
* Application-related notifications
* Notification read/unread management

---

## 👥 User Roles

The application is designed around two primary user roles.

| Role             | Capabilities                                            |
| ---------------- | ------------------------------------------------------- |
| 👨‍💻 Job Seeker | Profile, resume, browse jobs, apply, track applications |
| 🏢 Recruiter     | Company management, job posting, applicant management   |

---

## 🛠️ Technology Stack

### Frontend

* **React.js**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Axios**
* **React Hook Form**
* **JWT Decode**
* **React Icons**
* **Lucide React**
* **React Hot Toast**
* **React Toastify**
* **React Circular Progressbar**

### Backend

* **Python**
* **Django**
* **Django REST Framework**
* **JWT Authentication**
* **MySQL**
* **SMTP Email / Brevo**
* **CORS**
* **Django Media Files**

### Deployment

* **Frontend:** Vercel
* **Backend:** Django REST API
* **Database:** MySQL

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────────┐
                    │       React Frontend     │
                    │        Vite + React      │
                    │       Tailwind CSS       │
                    └────────────┬─────────────┘
                                 │
                                 │ REST API
                                 │ Axios + JWT
                                 ▼
                    ┌──────────────────────────┐
                    │     Django REST API      │
                    │     Django + DRF          │
                    └────────────┬─────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        Authentication      Job Management    Applications
        & Profiles          Companies          Notifications
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 ▼
                    ┌──────────────────────────┐
                    │          MySQL            │
                    │         Database          │
                    └──────────────────────────┘
```

---

## 📁 Project Structure

```text
multiuser_job_portal/
│
├── backend/
│   │
│   ├── accounts/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── companies/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── dashboard/
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── jobs/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── job_applications/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── notifications/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── profiles/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── README.md
```

---

# 🔗 API Endpoints

The backend is organized into separate Django applications.

## 🔐 Accounts

Base URL:

```text
/accounts/
```

| Method   | Endpoint                      | Purpose                 |
| -------- | ----------------------------- | ----------------------- |
| POST     | `/accounts/register/`         | Register a user         |
| POST     | `/accounts/verify-otp/`       | Verify registration OTP |
| POST     | `/accounts/login/`            | Login                   |
| POST     | `/accounts/logout/`           | Logout                  |
| POST     | `/accounts/forgot-password/`  | Request password reset  |
| POST     | `/accounts/verify-reset-otp/` | Verify reset OTP        |
| POST     | `/accounts/reset-password/`   | Reset password          |
| GET      | `/accounts/me/`               | Get authenticated user  |
| GET/POST | `/accounts/profile/`          | Account profile         |

---

## 🏢 Companies

Base URL:

```text
/companies/
```

| Method    | Endpoint           | Purpose        |
| --------- | ------------------ | -------------- |
| GET       | `/companies/`      | List companies |
| POST      | `/companies/`      | Create company |
| GET       | `/companies/<id>/` | Get company    |
| PUT/PATCH | `/companies/<id>/` | Update company |
| DELETE    | `/companies/<id>/` | Delete company |

---

## 💼 Jobs

Base URL:

```text
/jobs/
```

### Public Job APIs

| Method | Endpoint              | Purpose               |
| ------ | --------------------- | --------------------- |
| GET    | `/jobs/all/`          | Browse available jobs |
| GET    | `/jobs/details/<id>/` | View job details      |

### Recruiter Job APIs

| Method    | Endpoint      | Purpose             |
| --------- | ------------- | ------------------- |
| GET       | `/jobs/`      | List recruiter jobs |
| POST      | `/jobs/`      | Create job          |
| GET       | `/jobs/<id>/` | Get job             |
| PUT/PATCH | `/jobs/<id>/` | Update job          |
| DELETE    | `/jobs/<id>/` | Delete job          |

---

## 👤 Profiles

Base URL:

```text
/profile/
```

| Method        | Endpoint                     | Purpose                   |
| ------------- | ---------------------------- | ------------------------- |
| GET/PUT/PATCH | `/profile/`                  | Manage job seeker profile |
| GET           | `/profile/completion/`       | Get profile completion    |
| GET/PUT/PATCH | `/profile/recruiterProfile/` | Manage recruiter profile  |

---

## 📩 Applications

Base URL:

```text
/applications/
```

| Method    | Endpoint                                | Purpose                     |
| --------- | --------------------------------------- | --------------------------- |
| POST      | `/applications/apply/<job_id>/`         | Apply for a job             |
| GET       | `/applications/my-applications/`        | View own applications       |
| GET       | `/applications/recruiter-applications/` | View recruiter applications |
| PUT/PATCH | `/applications/status/<id>/`            | Update application status   |

---

## 🔔 Notifications

Base URL:

```text
/notifications/
```

| Method    | Endpoint                    | Purpose                   |
| --------- | --------------------------- | ------------------------- |
| GET       | `/notifications/`           | Get notifications         |
| PUT/PATCH | `/notifications/<id>/read/` | Mark notification as read |

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

* Python 3.x
* Node.js
* npm
* MySQL
* Git

---

# 🔧 Backend Setup

Clone the repository:

```bash
git clone https://github.com/duttasagar/multiuser_job_portal.git
```

Navigate to the backend:

```bash
cd multiuser_job_portal/backend
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

You can use `.env.example` as a reference.

Example:

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key
DEBUG=False

EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_brevo_smtp_login
EMAIL_HOST_PASSWORD=your_brevo_smtp_key

CORS_ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-url.vercel.app

CSRF_TRUSTED_ORIGINS=https://your-backend.onrender.com,https://your-frontend.vercel.app
```

**Never commit your actual `.env` file or secret credentials to GitHub.**

---

# 🗄️ Database Setup

Create a MySQL database.

Then configure your database credentials through the environment variables.

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create a Django superuser:

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend will be available at:

```text
http://127.0.0.1:8000/
```

---

# 🎨 Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd multiuser_job_portal/frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Frontend will normally be available at:

```text
http://localhost:5173/
```

---

# 🔄 Application Flow

### Job Seeker Flow

```text
Register
   ↓
Email OTP Verification
   ↓
Login
   ↓
Complete Profile
   ↓
Upload Resume
   ↓
Browse Jobs
   ↓
View Job Details
   ↓
Apply
   ↓
Track Application
   ↓
Receive Notifications
```

### Recruiter Flow

```text
Register
   ↓
Email OTP Verification
   ↓
Login
   ↓
Complete Recruiter Profile
   ↓
Create Company
   ↓
Create Job
   ↓
Publish Job
   ↓
Receive Applications
   ↓
Review Candidates
   ↓
Update Application Status
```

---

# 🔒 Authentication

The application uses **JWT-based authentication** to protect authenticated API endpoints.

The frontend sends the authentication token with API requests using Axios.

Protected functionality includes:

* User profile
* Job creation and management
* Company management
* Job applications
* Recruiter applications
* Notifications
* Application status updates

---

# 📧 Email Verification

The authentication system supports email-based OTP verification.

SMTP configuration can be provided through environment variables.

The project is configured to support **Brevo SMTP** for sending authentication emails.

OTP functionality is used for:

* Account verification
* Password reset verification

---

# 🖥️ Deployment

The frontend is deployed using Vercel.

### Live Frontend

https://multiuser-job-portal.vercel.app

For production deployment, configure:

* Environment variables
* CORS allowed origins
* CSRF trusted origins
* Database connection
* SMTP credentials
* Backend API URL

---

# 🧪 Development Commands

### Backend

```bash
python manage.py runserver
```

### Frontend

```bash
npm run dev
```

### Frontend Production Build

```bash
npm run build
```

### Frontend Preview

```bash
npm run preview
```

### Lint Frontend

```bash
npm run lint
```

---

# 📌 Future Improvements

Potential improvements for future versions:

* Advanced job search and filtering
* Pagination
* Resume parsing
* AI-based job recommendations
* Resume-to-job matching
* Recruiter analytics
* Application email notifications
* Social login
* Admin management dashboard
* Real-time notifications
* Improved job recommendation system

---

# 👨‍💻 Author

**Sagar Dutta**

BSc-IT Graduate | Full Stack Developer

### Technologies

```text
React.js
Django
Django REST Framework
Python
MySQL
JavaScript
Tailwind CSS
REST API
JWT Authentication
```

---

# 📄 License

This project is developed for **learning, portfolio, and demonstration purposes**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**GitHub:**
https://github.com/duttasagar/multiuser_job_portal

**Live Demo:**
https://multiuser-job-portal.vercel.app
