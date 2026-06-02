Backend Development Assignment – ProductHub

React Frontend + Node.js + MongoDB Backend

🚀 Features

- JWT Authentication
- Cookie-Based Authentication
- Role-Based Access Control (User/Admin)
- bcrypt Password Hashing
- Product CRUD Operations
- Pagination Support
- React + Material UI Frontend
- MongoDB Database
- Postman Collection Included

---

👤 Register API

- Creates a new account in the system.
- Validates required fields before registration.
- Prevents duplicate user registrations.
- By default, registers users with the User role.
- Assigns the Admin role when the correct Admin Secret Password is provided.
- Hashes passwords securely using bcrypt.
- Redirects users to the Login Page after successful registration.

---

🔐 Login API

- Authenticates users using Email and Password.
- Verifies passwords using bcrypt.
- Generates a JWT Token upon successful login.
- Stores JWT Token in HTTP-Only Cookies.
- Supports secure Cookie-Based Authentication.
- Redirects users based on their role:
  - Admin → Admin Dashboard
  - User → User Dashboard

---

👤 Profile API

- Retrieves authenticated user profile information.
- Displays Name, Email, and Role.
- Protected using JWT Cookie-Based Authentication.

---

📦 Product APIs

Add Product API

- Allows authenticated users to create products.
- Accessible only to Users (not Admins).
- Validates Title, Description, and Price.
- Associates products with the logged-in user.

Get All Products API

- Retrieves products created by the logged-in user.
- Supports Pagination.
- Returns product Title, Description, and Price.

View Single Product API

- Retrieves product details using Product ID.
- Displays complete product information.
- Integrated with the My Products page.

Update Own Product API

- Allows users to update Title, Description, and Price.
- Ensures only product owners can modify products.
- Supports Soft Delete functionality.
- Integrated with the frontend.

---

👑 Admin APIs

Admin Get All Products API

- Retrieves products from all users.
- Supports Pagination.
- Accessible only to Admins.

Admin View Single Product API

- Retrieves complete product details.
- Displays Product Owner information.
- Accessible only to Admins.

Admin Delete Product API

- Allows Admins to delete any product.
- Supports Soft Delete functionality.
- Integrated with the Admin Dashboard.

---

📮 Postman Collection

A Postman Collection file is included in the repository for testing and verifying all APIs.

---

📌 Conclusion

This project implements a secure Product Management System using Node.js, Express.js, MongoDB, JWT Authentication, Cookie-Based Authentication, and Role-Based Access Control.

A basic React + Material UI frontend is included to demonstrate API integration and product management workflows for both Users and Admins.