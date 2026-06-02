# Backend Development Assignment – ProductHub (React Frontend + Node.js  MongDB Backend )

# 👤 Register API
🔹 Creates a new account in the system.
🔹 Validates all required fields before registration.
🔹 Checks if the user already exists and prevents duplicate registrations.
🔹 By default, every new account is registered as a User.
🔹 If the user enters the correct Admin Secret Password during registration, the system automatically assigns the Admin role.
🔹 User passwords are securely hashed using bcrypt before being stored in the database.
🔹 After successful registration, users are redirected to the Login Page.
🔹 After login, users are redirected to their respective dashboards based on their role.
-----

# 🔐 Login API
🔹 Authenticates users using their email and password.
🔹 Validates user credentials and verifies the password using bcrypt.
🔹 Generates a secure JWT Token upon successful login.
🔹 Stores the JWT Token in HTTP-Only Cookies for secure authentication.
🔹 Supports Cookie-Based Authentication for protected routes.
🔹 After login, users are redirected based on their role:
- Admin → Admin Dashboard
- User → User Dashboard
---

# 👤 Profile API
🔹 Retrieves the authenticated user's profile information.
🔹 Uses the JWT Token stored in cookies to verify the user.
🔹 Displays user details such as Name, Email, and Role.
🔹 Allows users to view their profile directly from the dashboard.
🔹 Ensures that only authenticated users can access profile information.
---

# 📦 Add Product API
🔹 Allows authenticated Users to add new products to the system.
🔹 Accessible only to users with the User role; Admins are not permitted to create products.
🔹 Validates all required fields such as Title, Description, and Price before creating a product.
🔹 Associates each product with the logged-in user.
🔹 Ensures only authenticated users can access this functionality through JWT Cookie-Based Authentication.
---


# 📋 Get All Products API
🔹 Allows authenticated users to view all products created by them.
🔹 Retrieves products associated with the logged-in user only.
🔹 Supports Pagination to efficiently manage and display large numbers of products.
🔹 Ensures only authenticated users can access their product list through JWT Cookie-Based Authentication.
🔹 Returns product details such as Title, Description, and Price.
----

# 🔍 View Single Product API
🔹 Allows authenticated users to view the complete details of a specific product.
🔹 Retrieves a single product using its unique Product ID.
🔹 Displays product information such as Title, Description, and Price.
🔹 Accessible only to authenticated users through JWT Cookie-Based Authentication.
🔹 Integrated with the My Products page, allowing users to click on any product and view its complete details in the frontend.
----


# ✏️ Update Own Product API
🔹 Allows authenticated users to update their own product details such as Title, Description, and Price.
🔹 Ensures that users can only modify products created by them.
🔹 Supports Soft Delete functionality by marking a product as deleted instead of permanently removing it from the database.
🔹 Integrated with the frontend, allowing users to Edit or Delete products directly from the My Products page.
🔹 Protected through JWT Cookie-Based Authentication to ensure secure access.
---


# 🛠️ Admin Get All Products API
🔹 Allows authenticated Admins to view all products available in the system.
🔹 Retrieves products created by all users.
🔹 Supports Pagination for efficient product management and performance optimization.
🔹 Enables admins to monitor and manage products across the platform.
🔹 Protected through JWT Cookie-Based Authentication and accessible only to users with the Admin role.
---

# 🔍 Admin View Single Product API
🔹 Allows authenticated Admins to view the complete details of any product in the system.
🔹 Retrieves a specific product using its unique Product ID.
🔹 Displays product information such as Title, Description, Price, and Product Owner.
🔹 Integrated with the frontend, allowing admins to click on a product and view its complete details.
🔹 Protected through JWT Cookie-Based Authentication and accessible only to users with the Admin role.
---

# 🗑️ Admin Delete Product API
🔹 Allows authenticated Admins to delete any product in the system.
🔹 Retrieves the product using its unique Product ID before performing the delete operation.
🔹 Supports Soft Delete by marking the product as deleted instead of permanently removing it from the database.
🔹 Integrated with the frontend, allowing admins to delete products directly from the Admin Dashboard.
🔹 Protected through JWT Cookie-Based Authentication and accessible only to users with the Admin role.

----

📌 Conclusion

This project successfully implements a Product Management System with secure JWT Cookie-Based Authentication, role-based access control, and complete product management functionality. Users can register, log in, manage their own products, and view profile information, while admins have access to monitor and manage all products across the system.

A basic and clean frontend UI has been developed using React and Material UI to demonstrate the integration of backend APIs with frontend functionality. All APIs have also been tested using Postman, and the Postman Collection file is included in the repository for API testing and verification.