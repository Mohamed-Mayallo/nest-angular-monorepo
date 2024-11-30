# Nest-Angular Monorepo

## 1. Configure your app

Create a new .env file in the `backend` repo and having the following values:

```javascript
NODE_ENV = development;
DB_URL = your - db - url;
JWT_SECRET = secret;
```

## 2. Run tasks

Run Frontend using:

```sh
npx nx run frontend:serve:development
```

Run Backend using:

```sh
npx nx run backend:serve:development
```

## 3. Try the functionality

Open a new browser tab and hit the following link:

```
http://localhost:4200
```

## Used tools

- Nest.js (API)
- MongoDB Atlas (Database)
- Angular and Angular Material (UI)
- Nx (Monorepo)
- NGRX (Store)

## Implemented features

- Registration
- Login
- Logout
- Tracking authentication token expiration
- Create post
- Get posts for authenticated users
- Forgot password
