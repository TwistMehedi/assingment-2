

🎯 Project Overview (Short & Professional)

The Vehicle Rental System is a backend API designed to manage the entire workflow of a vehicle rental service. It supports vehicle inventory management, customer accounts, and rental bookings, 
with full role-based authentication for Admin and Customer users. The system ensures secure user access, real-time vehicle availability tracking, automated price 
calculation, and controlled updates to vehicles and bookings.

🚀 Features
✅ Authentication & Authorization

Secure JWT-based signin

Role-based access (Admin & Customer)

Password hashing with bcrypt

🚗 Vehicle Management

Create, update, delete vehicles

Track vehicle availability (available, booked)

Prevent deletion if active bookings exist

View all vehicles

👤 User Management

Admin can view and manage all users

Customers can update only their own profile 

Prevent deletion if the user has active bookings

📅 Booking Management

Create bookings with date validation

Automatic total price calculation

Vehicle availability check before booking

Admin can mark vehicle as returned

Customers can cancel bookings before start date


🗃️ Database & Validation

 PostgreSQL

🛠️ Technology Stack
Backend

Node.js – Runtime environment

Express.js – Web framework

TypeScript – Strongly typed development

PostgreSQL – Relational database

pg / pool – PostgreSQL Neondb

Authentication & Security

bcrypt – Password hashing

jsonwebtoken (JWT) – Token-based authentication

Role-based middleware – Admin/Customer access control

Utilities & Tools

dotenv for environment variables
