# E-Commerce API

## Overview
This project is a Node.js-based RESTful API for an e-commerce platform, built with Express.js and MongoDB. It supports product management, user roles and permissions, category handling, and order processing with both online and physical order types.

## Features
- **Product Management**: Create, update, delete, and retrieve products by category.
- **Role & Permission Management**: Create roles, assign/remove permissions, and manage role-based access.
- **Category Management**: Create, update, and delete product categories.
- **Order Management**: Create, confirm, cancel, update, and track orders (online/physical) with queue and payment processing.
- **User Management**: User/admin creation, login with JWT, role assignment, and profile updates.
- **API Documentation**: Swagger UI for endpoint exploration.

## Tech Stack
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database (via Mongoose)
- **JWT**: Authentication
- **Cloudinary**: Image storage (configured in `server.js`)
- **Swagger**: API documentation

## Project Structure
```
├── app
│   ├── controllers
│   │   ├── productController.js
│   │   ├── roleController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── services
│   │   ├── productService.js
│   │   ├── roleService.js
│   │   ├── categoryService.js
│   │   ├── orderService.js
│   │   └── userService.js
│   ├── models
│   │   ├── Role.js
│   │   ├── Permission.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   ├── Product.js
│   │   ├── CustomerProfile.js
│   │   ├── User.js
│   │   └── Queue.js
│   ├── utils
│   │   ├── utils.js
│   │   ├── routeUtils.js
│   │   └── constants.js
│   ├── helpers
│   │   └── resHelper.js
│   ├── startup
│   │   ├── expressStartup.js
│   │   └── dbConfig.js
│   └── routes
│       └── index.js
├── server.js
└── .env.development
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.development`:
   ```env
   NODE_ENV=development
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   MONGODB_URI=<your-mongodb-uri>
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm run dev 
   ```

## Running the Application
- The server runs on `http://localhost:<PORT>` (default: 3000).
- Access API documentation at `/api-docs`.

## Key Endpoints
- **Products**: `POST /products`, `GET /products`, `PUT /products`, `DELETE /products`
- **Roles**: `POST /roles`, `DELETE /roles`, `GET /roles`, `PUT /roles/permissions`
- **Categories**: `POST /categories`, `GET /categories`, `PUT /categories`, `DELETE /categories`
- **Orders**: `POST /orders`, `PUT /orders/confirm`, `GET /orders/queue`, `POST /orders/payment`
- **Users**: `POST /users`, `POST /login`, `PUT /users/profile`, `DELETE /users`

## Usage Notes
- **Authentication**: JWT tokens are required for protected routes (generated via `/login`).
- **Roles**: Admins can create roles and assign permissions; users are assigned roles for access control.
- **Orders**: Supports online (customer) and physical (dine-in/takeaway) orders with queue management.
- **Error Handling**: Uses `http-errors` for consistent error responses.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/<feature-name>`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature/<feature-name>`).
5. Open a pull request.

## License
MIT License. See `LICENSE` for details.

## Contact
For issues or questions, open a GitHub issue or contact the project maintainer.
