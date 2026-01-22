# Ecomify Auth Service

Authentication microservice for the Ecomify ecosystem. This service handles user registration, login, and JWT token validation. It is built with **NestJS** and uses **TCP** as the transport layer to communicate with the API Gateway or other services.

## Features

-   **Authentication**: User Login and Registration.
-   **Security**: Password hashing with `bcrypt` and JWT (JSON Web Tokens) strategy.
-   **Database**: TypeORM with support for SQLite (configurable).
-   **Microservice**: Communication via TCP.
-   **Validation**: DTOs validated with `class-validator` and `class-transformer`.
-   **Error Handling**: Custom exception filters (`RpcException`) for seamless integration with API Gateways.

## Prerequisites

-   Node.js (v18 or higher recommended)
-   NPM

## Installation

```bash
npm install
```

## Configuration

The service uses environment variables for configuration. Copy the `.env.template` file to `.env` and adjust the necessary values:

```bash
cp .env.template .env
```

### Environment Variables

| Variable | Description | Default Value |
| --- | --- | --- |
| `PORT` | TCP port where the service listens | `3001` |
| `DATABASE_NAME` | SQLite database filename | `auth_db.sqlite` |
| `JWT_SECRET` | Secret key for signing tokens | Required |
| `NODE_ENV` | Execution environment (`dev`, `prod`, `test`) | `dev` |

## Running the App

```bash
# development
npm run start

# watch mode (recommended for development)
npm run start:dev

# production mode
npm run start:prod
```

## Message Patterns (Microservice)

This service listens for the following Message Patterns via TCP:

### AuthController

-   `{ cmd: 'login' }`: Sign in. Expects a payload with `{ email, password }`.
-   `{ cmd: 'register' }`: Register new user. Expects a payload with `{ email, password, roles? }`.
-   `{ cmd: 'validate_token' }`: Validate a JWT token. Expects the token as payload (string).

## Project Structure

-   `src/auth`: Main authentication module (Controller, Service, JWT Strategy).
-   `src/users`: User management module (Entity, Service, Repository).
-   `src/common`: Shared utilities, exception filters (`CustomRpcExceptionFilter`).
-   `src/config`: Configuration and environment variable validation (`Joi`).

## Technologies

-   [NestJS](https://nestjs.com/)
-   [TypeORM](https://typeorm.io/)
-   [SQLite](https://sqlite.org/)
-   [Passport](http://www.passportjs.org/) & JWT
