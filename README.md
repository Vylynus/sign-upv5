# User Profile App

A simple web application for user registration and profile management using Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm (Node Package Manager)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/user-profile-db
   SESSION_SECRET=your-secret-key
   ```
   Make sure to change `your-secret-key` to a secure random string.

## Running the Application

1. Make sure MongoDB is running on your system
2. Start the application:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`

## Features

- User registration with email and password
- Secure password hashing using bcrypt
- User authentication with sessions
- Profile management (username and bio)
- Responsive design with CSS

## File Structure

```
.
├── public/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   └── styles.css
├── server.js
├── package.json
├── .env
└── README.md
```
