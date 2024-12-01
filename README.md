# Nest-Angular Monorepo

## Install app locally

### 1. Configure your app

Create a new .env file in the `backend` repo and having the following values:

```javascript
NODE_ENV = development;
DB_URL = your - db - url;
JWT_SECRET = secret;
```

### 2. Run tasks

Run Frontend using:

```sh
npx nx run frontend:serve:development
```

Run Backend using:

```sh
npx nx run backend:serve:development
```

### 3. Try the functionality locally

Open a new browser tab and hit the following link:

```
http://localhost:4200
```

## Try the app remotely

You can try the whole functionality remotely by hitting the following URL:

```
http://34.71.100.200/login
```

**NOTE: To be able to try the forgot password functionality, please use `1234` as a verification code.**

## Used tools

- Nest.js (API)
- MongoDB Atlas (Database)
- Angular and Angular Material (UI)
- Nx (Monorepo)
- NGRX (Store)
- GCP (VM)
- PM2 (Process Manager)

## Implemented features

- Registration
- Login
- Logout
- Tracking authentication token expiration
- Create post
- Get posts for authenticated users
- Forgot password
- Deployment on GCP
