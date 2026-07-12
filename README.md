# Student Result Management System

A full-stack Student Result Management System built using **ASP.NET Core Web API**, **React.js**, **SQL Server**, and **Entity Framework Core**. The application allows users to manage students, record subject marks, and generate result summaries with calculated grades and pass/fail status.

---

## Technologies Used

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

### Frontend
- React.js
- Vite
- Axios
- Bootstrap 5

---

## Features

### Student Management
- Add new students
- View all students
- Update student details
- Delete students

### Marks Management
- Add marks for students
- Edit marks
- Delete marks
- View marks grouped by student

### Result Generation
- Calculate total marks
- Calculate average marks
- Assign grades automatically
- Display pass/fail status

---

# Backend Setup

## Prerequisites

- Visual Studio 2022
- .NET 8 SDK
- SQL Server
- SQL Server Management Studio (SSMS)

## Steps

1. Clone the repository.

2. Open the `StudentResultManagement.API` project in Visual Studio.

3. Update the SQL Server connection string in:

```
appsettings.json
```

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=StudentResultDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

4. Open **Package Manager Console**.

5. Run:

```powershell
Update-Database
```

6. Press **F5** or click **Run** to start the Web API.

Swagger UI will be available automatically.

---

# Frontend Setup

Open a terminal inside:

```
student-result-ui
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

Open the URL displayed by Vite (typically http://localhost:5173).

---

# Database Configuration

The project uses SQL Server with Entity Framework Core.

After updating the connection string in `appsettings.json`, run:

```powershell
Update-Database
```

This will automatically create the required database tables using Entity Framework Core migrations.

---

# API Documentation

Swagger is enabled in Development mode.

Available endpoints include:

## Students

| Method | Endpoint |
|--------|----------|
| GET | /api/Students |
| GET | /api/Students/{id} |
| POST | /api/Students |
| PUT | /api/Students/{id} |
| DELETE | /api/Students/{id} |

---

## Marks

| Method | Endpoint |
|--------|----------|
| GET | /api/Marks |
| GET | /api/Marks/student/{studentId} |
| POST | /api/Marks |
| PUT | /api/Marks/{id} |
| DELETE | /api/Marks/{id} |

---

## Results

| Method | Endpoint |
|--------|----------|
| GET | /api/Results/student/{studentId} |

---

# Project Structure

```
StudentResultManagement
│
├── StudentResultManagement.API
│   ├── Controllers
│   ├── Models
│   ├── DTOs
│   ├── Data
│   ├── Migrations
│   └── Program.cs
│
├── student-result-ui
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Screenshots

## Students

![Students](screenshots/students.png)
---

## Marks

![Marks](screenshots/marks.png)
---

## Results

![Results](screenshots/results.png)
---

## Swagger API

![Swagger](screenshots/swagger.png)
---


# Author

**Ranjan Kumar Rajbanshi**
