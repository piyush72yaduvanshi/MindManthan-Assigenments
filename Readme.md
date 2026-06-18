# MindManthan Assignments

A simple Express.js REST API for managing users with in-memory storage and request validation.

## Project Overview

This project provides a basic user management API that supports:
- Create user
- Get all users
- Get a user by ID
- Update user
- Delete user

The API uses:
- `express` for HTTP server and routing
- `express-validator` for request validation
- `dotenv` for environment configuration

## Project Structure

- `src/index.js` - application entry point and server setup
- `src/routes/user.routes.js` - user endpoint definitions
- `src/controllers/user.controller.js` - controller logic for user operations
- `src/validator/validation.js` - request validation middleware
- `src/data/user.js` - in-memory user storage
- `package.json` - npm project metadata and scripts

## Installation

1. Clone or copy the repository
2. Install dependencies:

```bash
npm install
```

3. Optional: create a `.env` file to set a custom port

Example `.env`:

```env
PORT=8080
```

## Run the Project

Start the server with:

```bash
npm run dev
```

The API will run on `http://localhost:8080` by default.

## API Endpoints

### Health check

- `GET /`
- Response: `{ success: true, message: "API Running" }`

### Get all users

- `GET /api/user`
- Response: `200` with list of users
- If no users exist: `404` with `No users found`

### Get user by ID

- `GET /api/user/:id`
- Response: `200` with user object
- If user not found: `404` with `User not found`

### Create a user

- `POST /api/user/`
- Request body:
  - `name` (string, required)
  - `email` (string, required, valid email)
- Response: `201` with created user
- Validation errors: `400`
- Duplicate email: `409`

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Update a user

- `PUT /api/user/:id`
- Request body:
  - `name` (string, required)
  - `email` (string, required, valid email)
- Response: `200` with updated user
- If user not found: `404`
- Validation errors: `400`

### Delete a user

- `DELETE /api/user/:id`
- Response: `200` with deleted user
- If user not found: `404`

## Validation

The project validates requests for user creation and update using `express-validator`:
- `name` is required and must not be empty
- `email` is required and must be a valid email format

## Notes

- User data is stored in memory inside `src/data/user.js`. This means data will reset when the server restarts.
- The app is designed as a small assignment/demo project and does not currently use a database.

## License

This repository uses the `ISC` license.
