# Course Selling App

A backend REST API application for an online course marketplace built with Node.js and Express.

This repository contains the source code for a basic course selling application. The application allows users to browse, purchase, and manage courses.

## Features

- User authentication and authorization
- Course browsing and searching
- Course purchase and payment processing
- User profile management
- Admin panel for course management
- User and Admin authentication
- Course management system
- Purchase tracking
- Input validation using Zod
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Zod for input validation

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ANISH-SR/course-selling-app-basic.git
    ```
2. Navigate to the project directory:
    ```bash
    cd course-selling-app-basic
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Setting Up Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and update the following values:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for user authentication
   - `ADMIN_JWT_SECRET`: Secret key for admin authentication
   - `PORT`: Server port (default: 3000)

## Usage

1. Start the development server with nodemon:
    ```bash
    npm run dev
    ```

2. Start the production server:
    ```bash
    npm start
    ```

## Project Structure

```
.
├── node_modules/    # Project dependencies
├── src/
│   ├── models/     # Database models
│   │   ├── user.js
│   │   ├── admin.js
│   │   ├── course.js
│   │   └── purchase.js
│   ├── routes/     # API route handlers
│   │   ├── admin.js
│   │   ├── course.js
│   │   └── user.js
│   ├── middleware/ # Custom middleware
│   │   ├── auth.js
│   │   └── validation.js
│   ├── config/     # Configuration files
│   │   └── db.js
│   └── utils/      # Utility functions
│       └── helpers.js
├── public/         # Static files
├── .env            # Environment variables
├── .env.example    # Environment template
├── .gitignore     # Git ignore rules
├── package.json    # Project metadata
└── README.md      # Project documentation
```

## Database Models

- **User**: Store user information
- **Admin**: Store admin information
- **Courses**: Course details including title, description, price
- **Purchases**: Track course purchases by users

## API Endpoints

### User Routes
- `POST /user/signup` - Register new user
- `POST /user/signin` - User login
- `GET /user/purchases` - Get user's purchased courses

### Admin Routes
- `POST /admin/signup` - Register new admin
- `POST /admin/signin` - Admin login
- `POST /admin/create` - Create new course
- `PUT /admin/course` - Update course
- `GET /admin/course/bulk` - Get all courses

### Course Routes
- `POST /course/purchase` - Purchase a course
- `GET /course/preview` - Preview course details

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
