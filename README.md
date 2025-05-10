# Auth Chain (RBAC) System

A secure and scalable Role-Based Access Control (RBAC) system built with **Node.js**, **Express**, **PostgreSQL**, **Sequelize**, and **JWT Authentication**.

## Features

- User authentication with JWT
- Role-based access (e.g., Super Admin, Admin, User, Guest)
- Secure endpoints with role-specific permissions
- RESTful API structure
- PostgreSQL with Sequelize ORM
- Environment configuration with `.env`
- Centralized error handling
- Password hashing with bcrypt
- Middleware-based access control

## Project Structure

```
Auth_Chain/
├── src/
│   ├── app.js
│   ├── config/
│   ├── controller/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── index.js
│   ├── db/
│   │   └── models/
│   │       ├── users.model.js
│   │       ├── roles.model.js
│   │       └── index.js
│   ├── middlewares/
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   └── index.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── token.service.js
│   │   └── index.js
│   ├── utils/
│   └── validation/
├── .env
├── package.json
├── package-lock.json
└── README.md
```

## Roles

- **Super Admin**: Full access to manage users and roles.
- **Admin**: Can manage users with lower roles.
- **User**: Limited access to resources.
- **Guest**: Basic read-only or custom access.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

### Installation

```bash
git clone https://github.com/pranay022/Auth_Chain.git
cd Auth_Chain
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=5000
COOKIE_EXPIRATION_HOURS=24
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRATION_MINUTES=3000
JWT_REFRESH_EXPIRATION_DAYS=3000
SQL_DIALECT=postgres
SQL_USERNAME=postgres
SQL_HOST=localhost
SQL_DATABASE_NAME=auth_chain
SQL_PASSWORD=your_db_password
SQL_PORT=5432
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Database Setup

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Run the Server

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint             | Access Level        | Description                  |
|--------|----------------------|---------------------|------------------------------|
| POST   | /v1/auth/register/users | Public              | Register a new user          |
| POST   | /v1/auth/register/admin | Public              | Register a new admin         |
| POST   | /v1/auth/register/guest | Public              | Register a new guest         |
| POST   | /v1/auth/login          | Public              | User login                   |
| POST   | /v1/user/admin_approval | Super Admin         | Approve admin                |
| POST   | /v1/user/user_approval  | Admin               | Approve user                 |
| GET    | /v1/user/all_users      | Super Admin/Admin   | Get all users                |
| GET    | /v1/user/all_admins     | Super Admin         | Get all admins               |
| POST   | /v1/user/update_guest   | Guest               | Update guest profile         |

> Role checks are done via middleware using decoded JWT payload.

## 🛠️ Technologies Used

- **Node.js**
- **Express**
- **PostgreSQL**
- **Sequelize**
- **JWT**
- **bcrypt**
- **dotenv**
- **Cloudinary** (for image uploads)

## Author

Developed by pranay (https://github.com/pranay022)

## License

This project is licensed under the MIT License.
