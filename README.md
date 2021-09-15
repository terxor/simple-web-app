# Simple Web App

A simple NodeJS web application that can be used as a basic
structure for building your application.

- Express based
- MySQL database
- Authentication with session (uses *passport.js*)

### Prerequisites

- NodeJS
- MySQL Server

### Usage

1. Change directory:
    ```
    cd simple-web-app
    ```
1. Install dependencies:
    ```
    npm install
    ```
1. Initialize (or reset) database
    ```
    node reset_db.js
    ```
    You may need to configure parameters like user, password, URL, etc.
    in `.env`
1. Start server
    ```
    npm start
    ```

***