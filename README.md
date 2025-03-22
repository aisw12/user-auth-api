User Authentication API
Overview
This project is a User Authentication API built with Node.js, Express, MongoDB, bcrypt, and JWT. It provides basic authentication functionality, including user registration, login, and protected routes with role-based access control.

Features
User Registration: Stores username and hashed password using bcrypt.
User Login: Verifies credentials and returns a JWT token.
Protected Profile Route: Accessible only with a valid JWT token.
Role-Based Authentication: Admin/User roles for different access levels.
MongoDB Integration: Stores user data securely.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
Security: bcrypt for password hashing, JWT for authentication

API Endpoints

User Registration
http://localhost:5001/api/auth/profile

User Login
http://localhost:5001/api/auth/profile

Get User Profile (Protected Route)
http://localhost:5001/api/auth/profile

Installation
Prerequisites

Node.js
MongoDB
Git

