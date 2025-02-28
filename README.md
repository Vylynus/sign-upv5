# Unveiled

Unveiled is a platform for underground artists to share and sell their work, focusing on meaning and culture.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Server

To start the server:

```
npm start
```

For development with auto-restart:

```
npm run dev
```

The server will run on http://localhost:3000

## Features

- User authentication (signup, login, logout)
- Profile management
- Portfolio showcase
- Underground art community

## Project Structure

- `/public` - Static files (HTML, CSS, client-side JS)
- `server.js` - Express server and API endpoints

## API Endpoints

- `POST /signup` - Create a new user account
- `POST /login` - Authenticate a user
- `POST /logout` - End a user session
- `GET /api/profile` - Get the current user's profile
- `POST /api/profile` - Update the current user's profile
