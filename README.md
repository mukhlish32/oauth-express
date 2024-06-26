## About
This project is a back-end application that supports user registration, email verification, social media OAuth login (Google and Facebook), and a user dashboard.

## Features
- User registration and login (manual and via social media).
- Email verification.
- OAuth authentication with Google and Facebook.
- JWT token-based authentication.
- Secure user dashboard accessible only by verified users.
- User activity tracking.

## Installing & Running the Application
- Clone the repository:
   ```bash
   git clone https://github.com/mukhlish32/oauth-express
   ```
- Change into the server project directory:
   ```bash
   cd server
   ```
- Install dependencies:
   ```bash
   npm install
   ```
- Create a copy of the `.env.example` file and rename it to `.env`. Update the database configuration according to your setup in the `DB_SETTING` environment variable.
- Set up your mailtrap host in the `.env` file to enable email notifications & set up your oauth gmail / facebook.
- To start the server, run the following command:
   ```bash
   node server.js
   ```
- You can now access the api server side at http://localhost:5000.

## API Endpoints
- Register a New User
  ```
    URL: POST /auth/register
  ```
- Verify Email
   ```
    URL: POST /auth/verify/email
   ```
- OAuth Authentication
   ```
    Google OAuth URL: GET /oauth/google
    Facebook OAuth URL: GET /oauth/facebook
   ```
- OAuth Callback
   ```
    Google OAuth Callback URL: GET /oauth/google/callback
    Facebook OAuth Callback URL: GET /oauth/facebook/callback
   ```
- Manual Login
   ```
    URL: POST /login
   ```
- User Dashboard
  ```
    URL: GET /dashboard
  ```
## Screenshot
![image](https://github.com/mukhlish32/oauth-express/assets/85531251/b32d1f43-b2ad-4c96-b090-825ab298ee46)
![image](https://github.com/mukhlish32/oauth-express/assets/85531251/cf9320b0-ce75-477c-a0fc-da655979be0c)
![image](https://github.com/mukhlish32/oauth-express/assets/85531251/1d7fe44a-536c-4602-908a-fb441c320420)
![image](https://github.com/mukhlish32/oauth-express/assets/85531251/011932ec-8d80-4f27-86db-47e8cf83e5ac)
![image](https://github.com/mukhlish32/oauth-express/assets/85531251/a2669f78-eb9f-4ca9-a468-dd39bd145658)
![image](https://github.com/mukhlish32/oauth-express/assets/85531251/1119c4ed-edd1-413c-a14a-2ae5b3192696)
