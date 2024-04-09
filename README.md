# User Management Backend System

This repository contains the code for a User Management Backend System, developed as part of the Transition Computing internship assignment.

## Overview

The User Management Backend System is a Node.js application built with Express.js framework, designed to manage user data in a MongoDB database. It provides functionalities for user registration, authentication, updating user information, and deletion of user accounts.

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Running the Application

To start the server, run the following command:

```bash
npm start
```

The server will start running on port 5000 by default.

## API Documentation

Swagger is implemented for API documentation. After running the application, you can access the Swagger UI at `http://localhost:5000/api-docs`.

## Available Endpoints

- **GET /:** Returns a welcome message.
- **GET /getusers:** Retrieves all users.
- **POST /register:** Registers a new user.
- **POST /authenticate:** Authenticates a user.
- **PUT /updateuser:** Updates user information.
- **DELETE /deleteuser:** Deletes a user.

For detailed information on each endpoint, refer to the Swagger documentation.

## Testing

Unit tests are implemented using Chai and Mocha. To run the tests, use the following command:

```bash
npm test
```